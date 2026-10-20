import type {StaticImageData} from 'next/image';
import child from './images/child.jpg';
import detiVPrirode from './images/deti-v-prirode.jpg';
import fotenieSKonmi from './images/fotenie-s-konmi.jpg';
import zimaPodHradom from './images/kone-pod-hradom-zima.jpg';
import senzorickeHry from './images/senzoricke-hry.jpg';
import tvoriveDielne1 from './images/tvorive-dielne-1.jpg';
import tvoriveDielne2 from './images/tvorive-dielne-2.jpg';
import vozenieNaKoni from './images/vozenie-na-koni.jpg';
import zoznamovanieSKonmi from './images/zoznamovanie-s-konmi.jpg';

/**
 * The association's photographs.
 *
 * To add one: drop the file in `src/content/images/`, import it here, add a
 * record, and add its caption to `gallery.photos.<id>` in every
 * `messages/*.json`. Nothing else needs to change: the gallery, the cards
 * and the page headers all read from this list.
 *
 * The files are imported rather than served from `public/`, so each one gets
 * a URL with a hash of its contents. Browsers can then cache it for good
 * instead of asking "has this changed?" on every visit, which on weak rural
 * signal is a round trip per photo. The import also gives `next/image` the
 * real dimensions (so the page never jumps while a photo loads) and a tiny
 * blurred preview for `placeholder="blur"`, with nothing to keep by hand.
 */
export type Photo = {
  id: string;
  src: StaticImageData;
  /**
   * CSS `object-position` for crops, when the subject is not where the crop
   * would keep it by default (cards keep the bottom, the gallery the center).
   * A portrait photo in a landscape slot needs this to keep the face.
   */
  position?: string;
};

export const photos: Photo[] = [
  {id: 'zima-pod-hradom', src: zimaPodHradom},
  {id: 'deti-v-prirode', src: detiVPrirode},
  {id: 'child', src: child},
  {id: 'vozenie-na-koni', src: vozenieNaKoni},
  {id: 'senzoricke-hry', src: senzorickeHry, position: '50% 20%'},
  {id: 'zoznamovanie-s-konmi', src: zoznamovanieSKonmi, position: '50% 35%'},
  {id: 'tvorive-dielne-1', src: tvoriveDielne1, position: '50% 45%'},
  {id: 'tvorive-dielne-2', src: tvoriveDielne2, position: '50% 50%'},
  {id: 'fotenie-s-konmi', src: fotenieSKonmi, position: '60% 25%'}
];

export function photoById(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}
