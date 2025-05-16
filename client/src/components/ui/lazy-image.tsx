import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  placeholderBlur?: boolean;
  onLoad?: () => void;
  style?: React.CSSProperties;
}

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  placeholderColor = '#f3f4f6',
  placeholderBlur = true,
  onLoad,
  style,
  ...props
}: LazyImageProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height' | 'style'>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Create IntersectionObserver to detect when image is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' } // Start loading 200px before image enters viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle image load complete
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundColor: placeholderColor,
        ...style
      }}
    >
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            onLoad={handleImageLoad}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            {...props}
          />
          {!isLoaded && placeholderBlur && (
            <div 
              className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"
              style={{ backdropFilter: 'blur(8px)' }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LazyImage;