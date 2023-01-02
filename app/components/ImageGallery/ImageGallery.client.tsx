'use client';
import { Carousel, Flowbite, useTheme } from 'flowbite-react';
import { products } from '@wix/stores';
import Image from 'next/image';
export function ImageGalleryClient({ items }: { items: products.MediaItem[] }) {
  const { theme } = useTheme();
  return (
    <div className="h-56 sm:h-96 max-h-96 max-w-xl mx-auto">
      <Flowbite
        theme={{
          theme: {
            carousel: {
              scrollContainer: {
                ...theme.carousel.scrollContainer,
                base: theme.carousel.scrollContainer.base + ' rounded-none',
              },
            },
          },
        }}
      >
        <Carousel slide={false}>
          {items.map((media, index) => (
            <Image
              key={index}
              src={media.image?.url || ''}
              alt={media.image?.altText ?? ''}
              width={600}
              height={400}
            />
          ))}
        </Carousel>
      </Flowbite>
    </div>
  );
}
