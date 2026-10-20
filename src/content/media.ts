import heroPoster from './images/hero-poster.jpg';

/**
 * The hero's background video, encoded from the association's own footage.
 *
 * Re-encode with ffmpeg rather than shipping the camera file: no audio
 * (`-an`), 24 fps with light denoise (`hqdn3d`), H.264 MP4 (`+faststart`) at
 * 1080p and 720p. The original `.mov` is ~40 MB and must never go into
 * `public/`.
 *
 * MP4 only, on purpose. An AV1 WebM used to come first, but newer iPhones
 * claim they can play it and then fail to decode it, and a browser that
 * fails after choosing a source never falls back to the next one: the
 * visitor got the poster forever. H.264 plays everywhere.
 *
 * `poster` is a still from the same footage. It paints first (and is the
 * page's largest paint); visitors on reduced motion, Data Saver or a 2G
 * connection only ever get the poster.
 */
export const heroVideo = {
  /** Imported, so it gets a content-hashed URL browsers cache for good. */
  poster: heroPoster,
  /** Listed in the order the browser should try them. */
  sources: [
    {src: '/videos/hero-720.mp4', type: 'video/mp4', media: '(max-width: 767px)'},
    {src: '/videos/hero-1080.mp4', type: 'video/mp4'}
  ]
} as const;
