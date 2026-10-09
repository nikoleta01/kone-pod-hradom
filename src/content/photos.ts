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
  /**
   * CSS `object-position` for crops, when the subject is not where the crop
   * would keep it by default (cards keep the bottom, the gallery the center).
   * A portrait photo in a landscape slot needs this to keep the face.
   */
  position?: string;
  /**
   * A 16px preview of the photo, shown blurred while the real file loads,
   * so a slow connection sees the photo's own colours instead of an empty
   * slot. Regenerate when the photo changes:
   * `sharp(file).resize(16, 16, {fit: 'inside'}).jpeg({quality: 50})`.
   */
  blurDataURL?: string;
};

export const photos: Photo[] = [
  {
    id: 'zima-pod-hradom',
    src: '/galeria/kone-pod-hradom-zima.jpg',
    width: 1440,
    height: 1440,
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAD/xAAiEAACAQIFBQAAAAAAAAAAAAABAgMAEgQFETFRFCEiYZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAC/9oADAMBAAIRAxEAPwB+ExBaIDTY6d+KQJEYXKSw5AoE0WZoqxxYCG9g3lcDsPlXR5sFtsYD060zTFyX/9k='
  },
  {
    id: 'deti-v-prirode',
    src: '/galeria/deti-v-prirode.jpg',
    width: 1440,
    height: 1440,
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgME/8QAJRAAAgICAQALAAAAAAAAAAAAAQIDEQAEEiEiMUFCUWGBkbHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIRE//aAAwDAQACEQMRAD8AE8Txu6uvF1Ph/PnFrvrRBpp7LBaAC1RrtJ8rGR1Izsh2kkPAm67uk/eaN9IdXbbXlPIEdcIKI9PfB0HSUKNMZ//Z'
  },
  {
    id: 'child',
    src: '/galeria/child.jpg',
    width: 1440,
    height: 1440,
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAJBAAAQMCBAcAAAAAAAAAAAAAAQIDEQAEEhMhMQUjUWFxgaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAHBEAAQMFAAAAAAAAAAAAAAAAAQADBAIREyEx/9oADAMBAAIRAxEAPwCDhjzLJy1pAVMpKicIPT5SbyW7rntRCt4ECfFZ9sDKBJk66Uuxfps7O0aQ2HG1pxE7eux3po7hFW0slvI3YdX/2Q=='
  },
  {
    id: 'vozenie-na-koni',
    src: '/galeria/vozenie-na-koni.jpg',
    width: 2400,
    height: 1600,
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAIG/8QAIRAAAQMDBAMAAAAAAAAAAAAAAQIDEQAFEgQTITEVQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEREv/aAAwDAQACEQMRAD8Az2muuqbZ2VEpZUco9AweaVbr1c9E5uMrK0pjJtXIUPtU2hOHQor6R5NtMDEskkR2ZolrEZiP/9k='
  },
  {
    id: 'senzoricke-hry',
    src: '/galeria/senzoricke-hry.jpg',
    width: 1600,
    height: 2400,
    position: '50% 20%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAF/8QAJBAAAgIBAQgDAAAAAAAAAAAAAQIEEQADBRITISIxQdEzUYH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAIDAAAAAAAAAAAAAAAAAAARAVFh/9oADAMBAAIRAxEAPwA3gEx9JtWNSMm+1GgQe3m/WE8aGzW0UMfssfeW0pkvX2bHjwvjVa4vE6mU+OeZo12RQp37Arq5n9ydVI7w/9k='
  },
  {
    id: 'zoznamovanie-s-konmi',
    src: '/galeria/zoznamovanie-s-konmi.jpg',
    width: 1600,
    height: 2400,
    position: '50% 35%',
    blurDataURL:
      'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBABAAICAgEFAAAAAAAAAAAAAQIRAwQAEgUhIjFigv/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAXEQEBAQEAAAAAAAAAAAAAAAABABEx/9oADAMBAAIRAxEAPwBbLT1gcldOqsxEK5NfM+Kk3Eyo/Tmcy7e3AImSXUpq7v0+eEdmVvtxn54eryRAv//Z'
  }
];

export function photoById(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}

