"""Fill missing YouTube titles via public oEmbed."""

from __future__ import annotations

import json
import ssl
import urllib.parse
import urllib.request
from pathlib import Path

UA = "Mozilla/5.0 (compatible; portafolio-alejandro/1.0)"
CTX = ssl.create_default_context()
SRC = Path("scripts/youtube-channel.json")
OUT = Path("scripts/youtube-channel.json")


def oembed_title(video_id: str) -> str:
    url = "https://www.youtube.com/oembed?format=json&url=" + urllib.parse.quote(
        f"https://www.youtube.com/watch?v={video_id}", safe=""
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=30) as res:
        data = json.loads(res.read().decode("utf-8"))
    return str(data.get("title", "")).strip()


def main() -> None:
    payload = json.loads(SRC.read_text(encoding="utf-8"))
    filled = 0
    for video in payload["videos"]:
        if video.get("title"):
            continue
        try:
            video["title"] = oembed_title(video["id"])
            filled += 1
        except Exception as error:
            video["title"] = video.get("title") or ""
            print("error", video["id"], type(error).__name__)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("filled", filled, "total", len(payload["videos"]))


if __name__ == "__main__":
    main()
