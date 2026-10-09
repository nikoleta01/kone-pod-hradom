/**
 * The hero's background video, encoded from the association's own footage.
 *
 * Re-encode with ffmpeg rather than shipping the camera file: no audio
 * (`-an`), 24 fps with light denoise (`hqdn3d`), AV1 in WebM first and H.264
 * MP4 (`+faststart`) as the fallback, each at 1080p and 720p. The original
 * `.mov` is ~40 MB and must never go into `public/`.
 *
 * `poster` is a still from the same footage. It paints first (and is the
 * page's largest paint); visitors on reduced motion, Data Saver or a 2G
 * connection only ever get the poster.
 */
export const heroVideo = {
  poster: {
    src: '/videos/hero-poster.jpg',
    width: 1920,
    height: 1080
  },
  /** Listed in the order the browser should try them. */
  sources: [
    {src: '/videos/hero-720.webm', type: 'video/webm; codecs="av01.0.05M.08"', media: '(max-width: 767px)'},
    {src: '/videos/hero-720.mp4', type: 'video/mp4', media: '(max-width: 767px)'},
    {src: '/videos/hero-1080.webm', type: 'video/webm; codecs="av01.0.08M.08"'},
    {src: '/videos/hero-1080.mp4', type: 'video/mp4'}
  ]
} as const;
