import { Carousel } from '@pittorica/react';

export function Gallery() {
  return (
    <Carousel.Root>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dcdavidev-me/image/upload/v1770480672/20200825064836_IMG_9604_lcgqw3.jpg"
          alt="mountains"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dcdavidev-me/image/upload/v1770480603/PXL_20251227_154005467.MP_qen6hx.jpg"
          alt="mountains"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dcdavidev-me/image/upload/v1770480602/IMG_20210526_173203039_HDR_ekbqmt.jpg"
          alt="mountains"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dcdavidev-me/image/upload/v1770480602/IMG_20220814_082519664-modificato_wefdkz.jpg"
          alt="mountains"
        />
      </Carousel.Item>
    </Carousel.Root>
  );
}
