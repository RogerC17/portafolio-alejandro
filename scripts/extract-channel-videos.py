"""Resolve SoyAlejo4.0 uploads playlist and extract remaining videos."""

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
CHANNEL = "https://www.youtube.com/@SoyAlejo4.0/videos"
OUT = Path("scripts/youtube-channel.json")


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


def extract_from_html(html: str) -> list[dict]:
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
    return unique


def channel_id_from_html(html: str) -> str:
    match = re.search(r'"channelId":"(UC[A-Za-z0-9_-]{22})"', html)
    if match:
        return match.group(1)
    match = re.search(r"youtube.com/channel/(UC[A-Za-z0-9_-]{22})", html)
    if match:
        return match.group(1)
    return ""


def browse_continuations(html: str) -> list[dict]:
    token_match = re.search(
        r'"continuationCommand":\{"token":"([^"]+)"',
        html,
    )
    version_match = re.search(r'"INNERTUBE_CLIENT_VERSION":"([^"]+)"', html)
    api_key_match = re.search(r'"INNERTUBE_API_KEY":"([^"]+)"', html)
    if not token_match or not version_match:
        return []

    token = token_match.group(1)
    version = version_match.group(1)
    api_key = api_key_match.group(1) if api_key_match else "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
    collected: list[dict] = []

    while token:
        body = json.dumps(
            {
                "context": {
                    "client": {
                        "clientName": "WEB",
                        "clientVersion": version,
                        "hl": "es",
                        "gl": "CO",
                    }
                },
                "continuation": token,
            }
        ).encode("utf-8")
        req = urllib.request.Request(
            f"https://www.youtube.com/youtubei/v1/browse?key={api_key}&prettyPrint=false",
            data=body,
            headers={
                "User-Agent": UA,
                "Content-Type": "application/json",
                "X-YouTube-Client-Name": "1",
                "X-YouTube-Client-Version": version,
            },
            method="POST",
        )
        with urllib.request.urlopen(req, context=CTX, timeout=45) as res:
            payload = json.loads(res.read().decode("utf-8", "replace"))
        batch: list[dict] = []
        walk_lockups(payload, batch)
        for item in batch:
            collected.append(item)
        next_token = None
        raw = json.dumps(payload)
        next_match = re.search(r'"continuationCommand":\{"token":"([^"]+)"', raw)
        if next_match:
            next_token = next_match.group(1)
        token = next_token if next_token and next_token != token else None

    return collected


def main() -> None:
    html = fetch(CHANNEL)
    channel_id = channel_id_from_html(html)
    first = extract_from_html(html)
    uploads: list[dict] = []
    if channel_id:
        uploads_html = fetch(f"https://www.youtube.com/playlist?list={channel_id.replace('UC', 'UU', 1)}")
        uploads = extract_from_html(uploads_html)
    continued = browse_continuations(html)
    seen: set[str] = set()
    merged: list[dict] = []
    for item in first + uploads + continued:
        if item["id"] in seen:
            continue
        seen.add(item["id"])
        merged.append(item)
    payload = {
        "channelId": channel_id,
        "firstPage": len(first),
        "uploadsPlaylist": len(uploads),
        "continued": len(continued),
        "merged": len(merged),
        "videos": merged,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: payload[k] for k in payload if k != "videos"}, ensure_ascii=False))
    for video in merged:
        print(f"{video['id']}\t{video['title']}")


if __name__ == "__main__":
    main()
