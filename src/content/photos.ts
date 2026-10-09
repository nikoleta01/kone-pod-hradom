/**
 * Photographs from the association's own Instagram.
 *
 * To add one: drop the file in `public/galeria/`, add a record here with its
 * real pixel dimensions, and add its caption to `gallery.photos.<id>` in every
 * `messages/*.json`. Nothing else needs to change — the gallery, the chart and
 * the per-service slots all read from this list.
 *
 * `next/image` needs true intrinsic dimensions to reserve space before the
 * file loads, which on weak rural signal is the difference between a stable
 * page and one that jumps under the reader's thumb.
 */
export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    id: 'zima-pod-hradom',
    src: '/galeria/kone-pod-hradom-zima.jpg',
    width: 1440,
    height: 1440
  },
  {
    id: 'deti-v-prirode',
    src: '/galeria/deti-v-prirode.jpg',
    width: 1440,
    height: 1440
  },
  {
    id: 'child',
    src: '/galeria/child.jpg',
    width: 1440,
    height: 1440
  }
];

export function photoById(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}

