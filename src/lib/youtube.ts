/** Helpers compartidos para embeds de YouTube (nocookie). */

export function youtubeEmbedSrc(
  videoId: string,
  options: {
    autoplay?: boolean
    mute?: boolean
    controls?: boolean
    loop?: boolean
  } = {},
) {
  const {
    autoplay = true,
    mute = true,
    controls = false,
    loop = true,
  } = options

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    fs: controls ? "1" : "0",
    disablekb: controls ? "0" : "1",
    iv_load_policy: "3",
  })

  if (loop) {
    params.set("loop", "1")
    params.set("playlist", videoId)
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`
}
