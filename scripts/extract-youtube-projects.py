"""Extract public YouTube titles and IDs for the projects archive."""

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
PLAYLIST = "https://www.youtube.com/playlist?list=PLGsF4QfCJgJneDnycH2vSX-INGzoGXsny"
CHANNEL = "https://www.youtube.com/@SoyAlejo4.0/videos"
OUT = Path("scripts/youtube-archive.json")


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Accept-Language": "es-CO,es;q=0.9"},
    )
    with urllib.request.urlopen(req, context=CTX, timeout=45) as res:
        return res.read().decode("utf-8", "replace")


def initial_data(html: str) -> dict:
    idx = html.find("ytInitialData")
    start = html.find("{", idx)
    data, _ = json.JSONDecoder().raw_decode(html[start:])
    return data


def text_of(node: object) -> str:
    if isinstance(node, str):
        return node.strip()
    if isinstance(node, dict):
        if "simpleText" in node and isinstance(node["simpleText"], str):
            return node["simpleText"].strip()
        runs = node.get("runs")
        if isinstance(runs, list):
            return "".join(str(run.get("text", "")) for run in runs if isinstance(run, dict)).strip()
        content = node.get("content")
        if isinstance(content, str):
            return content.strip()
        for key in ("text", "title", "label"):
            if key in node:
                found = text_of(node[key])
                if found:
                    return found
        for value in node.values():
            found = text_of(value)
            if found:
                return found
    if isinstance(node, list):
        for item in node:
            found = text_of(item)
            if found:
                return found
    return ""


def walk_lockups(node: object, acc: list[dict]) -> None:
    if isinstance(node, dict):
        lockup = node.get("lockupViewModel")
        if isinstance(lockup, dict):
            video_id = ""
            content_id = lockup.get("contentId")
            if isinstance(content_id, str) and len(content_id) == 11:
                video_id = content_id
            if not video_id:
                raw = json.dumps(lockup, ensure_ascii=False)
                match = re.search(r'"videoId":"([A-Za-z0-9_-]{11})"', raw)
                if match:
                    video_id = match.group(1)
            title = text_of(lockup.get("metadata") or lockup.get("title") or lockup)
            if video_id:
                acc.append({"id": video_id, "title": title})
        for value in node.values():
            walk_lockups(value, acc)
    elif isinstance(node, list):
        for item in node:
            walk_lockups(item, acc)


def extract(url: str) -> list[dict]:
    html = fetch(url)
    data = initial_data(html)
    items: list[dict] = []
    walk_lockups(data, items)
    seen: set[str] = set()
    unique: list[dict] = []
    for item in items:
        if item["id"] in seen:
            continue
        seen.add(item["id"])
        unique.append(item)
    if not unique:
        ids = list(dict.fromkeys(re.findall(r'"videoId":"([A-Za-z0-9_-]{11})"', html)))
        unique = [{"id": vid, "title": ""} for vid in ids]
    return unique


def main() -> None:
    playlist = extract(PLAYLIST)
    channel = extract(CHANNEL)
    payload = {
        "playlistCount": len(playlist),
        "channelCount": len(channel),
        "playlist": playlist,
        "channel": channel,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("playlist", len(playlist), "channel", len(channel), "->", OUT)


if __name__ == "__main__":
    main()
