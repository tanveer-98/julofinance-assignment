import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/css';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  placeholder: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  borderRadius,
  placeholder,
}) => {
  console.log(src)
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const imageStyles = css`
    display: ${isLoaded ? 'block' : 'none'};
    width: ${width || '100%'};
    height: ${height || 'auto'};
    border-radius: ${borderRadius || '0'};
  `;

  const placeholderStyles = css`
    display: ${isLoaded ? 'none' : 'block'};
    width: ${width || '100%'};
    height: ${height || '100px'}; /* You can set the height for your placeholder */
    border-radius: ${borderRadius || '0'};
  `;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isLoaded) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setIsLoaded(true);
              observer.unobserve(imageRef.current!);
            };
          }
        });
      });

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }
  }, [src, isLoaded]);

  
  return (
    <div>
      <div className={placeholderStyles} style={{ display: isLoaded ? 'none' : 'block' }}>
        {placeholder}
      </div>
      <img
        ref={imageRef}
        src={isLoaded ? src : ''}
        alt={alt}
        className={imageStyles}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default LazyImage;