"""Extract public video metadata from a YouTube playlist and channel handle."""

from __future__ import annotations

import json
import re
import ssl
import urllib.request
from pathlib import Path

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()
INNERTUBE = "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false"
OUT = Path("scripts/youtube-archive.json")


def get(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "es-CO,es;q=0.9"})
    with urllib.request.urlopen(req, context=CTX, timeout=45) as res:
        return res.read().decode("utf-8", "replace")


def post(url: str, payload: dict) -> dict:
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "User-Agent": UA,
            "Content-Type": "application/json",
            "Accept-Language": "es-CO,es;q=0.9",
        },
    )
    with urllib.request.urlopen(req, context=CTX, timeout=45) as res:
        return json.loads(res.read().decode("utf-8", "replace"))


def extract_json(html: str, marker: str) -> dict:
    idx = html.find(marker)
    if idx < 0:
        raise RuntimeError(f"missing {marker}")
    start = html.find("{", idx)
    decoder = json.JSONDecoder()
    obj, _ = decoder.raw_decode(html[start:])
    return obj


def text_of(value: object) -> str:
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        if "simpleText" in value:
            return str(value["simpleText"])
        runs = value.get("runs")
        if isinstance(runs, list):
            return "".join(str(run.get("text", "")) for run in runs)
    return ""


def video_from_renderer(node: dict) -> dict | None:
    renderer = node.get("playlistVideoRenderer") or node.get("gridVideoRenderer") or node.get("richItemRenderer", {}).get("content", {}).get("videoRenderer")
    if not renderer and "videoRenderer" in node:
        renderer = node["videoRenderer"]
    if not isinstance(renderer, dict):
        return None
    video_id = renderer.get("videoId")
    if not video_id:
        return None
    title = text_of(renderer.get("title"))
    published = text_of(renderer.get("publishedTimeText"))
    length = text_of(renderer.get("lengthText"))
    thumbs = renderer.get("thumbnail", {}).get("thumbnails", [])
    thumb = thumbs[-1]["url"] if thumbs else f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
    return {
        "id": video_id,
        "title": title,
        "published": published,
        "length": length,
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "thumb": thumb.split("?")[0],
    }


def walk(node: object, acc: list[dict], seen: set[str]) -> None:
    if isinstance(node, dict):
        video = video_from_renderer(node)
        if video and video["id"] not in seen:
            seen.add(video["id"])
            acc.append(video)
        for value in node.values():
            walk(value, acc, seen)
    elif isinstance(node, list):
        for item in node:
            walk(item, acc, seen)


def continuations(node: object, acc: list[str]) -> None:
    if isinstance(node, dict):
        token = node.get("continuationCommand", {}).get("token") if "continuationCommand" in node else None
        if not token and node.get("nextContinuationData"):
            token = node["nextContinuationData"].get("continuation")
        if token and token not in acc:
            acc.append(token)
        for value in node.values():
            continuations(value, acc)
    elif isinstance(node, list):
        for item in node:
            continuations(item, acc)


def paginate(api_key: str, client_version: str, tokens: list[str], videos: list[dict], seen: set[str]) -> None:
    queue = list(tokens)
    used: set[str] = set()
    while queue:
        token = queue.pop(0)
        if token in used:
            continue
        used.add(token)
        body = {
            "context": {
                "client": {
                    "clientName": "WEB",
                    "clientVersion": client_version,
                    "hl": "es",
                    "gl": "CO",
                }
            },
            "continuation": token,
        }
        url = f"{INNERTUBE}&key={api_key}" if api_key else INNERTUBE
        try:
            data = post(url, body)
        except Exception as exc:  # noqa: BLE001
            print("continuation failed", exc)
            break
        walk(data, videos, seen)
        extra: list[str] = []
        continuations(data, extra)
        for item in extra:
            if item not in used:
                queue.append(item)


def scrape_playlist(playlist_id: str) -> dict:
    html = get(f"https://www.youtube.com/playlist?list={playlist_id}")
    data = extract_json(html, "ytInitialData")
    videos: list[dict] = []
    seen: set[str] = set()
    walk(data, videos, seen)
    title = ""
    try:
        title = data["header"]["playlistHeaderRenderer"]["title"]["simpleText"]
    except Exception:  # noqa: BLE001
        title = text_of(
            data.get("metadata", {})
            .get("playlistMetadataRenderer", {})
            .get("title", "")
        )
    api_key = (re.search(r'"INNERTUBE_API_KEY":"([^"]+)"', html) or [None, ""])[1]
    client_version = (re.search(r'"INNERTUBE_CLIENT_VERSION":"([^"]+)"', html) or [None, "2.20240801.00.00"])[1]
    tokens: list[str] = []
    continuations(data, tokens)
    paginate(api_key, client_version, tokens, videos, seen)
    return {"title": title, "count": len(videos), "videos": videos}


def scrape_channel(handle: str) -> dict:
    html = get(f"https://www.youtube.com/{handle}/videos")
    data = extract_json(html, "ytInitialData")
    videos: list[dict] = []
    seen: set[str] = set()
    walk(data, videos, seen)
    api_key = (re.search(r'"INNERTUBE_API_KEY":"([^"]+)"', html) or [None, ""])[1]
    client_version = (re.search(r'"INNERTUBE_CLIENT_VERSION":"([^"]+)"', html) or [None, "2.20240801.00.00"])[1]
    channel = ""
    try:
        channel = data["metadata"]["channelMetadataRenderer"]["title"]
    except Exception:  # noqa: BLE001
        channel = handle
    tokens: list[str] = []
    continuations(data, tokens)
    paginate(api_key, client_version, tokens, videos, seen)
    return {"title": channel, "handle": handle, "count": len(videos), "videos": videos}


def main() -> None:
    playlist = scrape_playlist("PLGsF4QfCJgJneDnycH2vSX-INGzoGXsny")
    channel = scrape_channel("@SoyAlejo4.0")
    payload = {"playlist": playlist, "channel": channel}
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("playlist", playlist["title"], playlist["count"])
    for video in playlist["videos"]:
        print("P", video["id"], video["published"], video["title"])
    print("channel", channel["title"], channel["count"])
    for video in channel["videos"]:
        print("C", video["id"], video["published"], video["title"])


if __name__ == "__main__":
    main()
