import React, { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  draggable?: boolean;
}

export default function OptimizedImage({
  src,
  fallbackSrc,
  webpSrc,
  alt,
  className = "",
  containerClassName = "",
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(webpSrc || src);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (currentSrc !== src) {
      setCurrentSrc(src);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Sleek Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white/5 animate-pulse backdrop-blur-xs flex items-center justify-center pointer-events-none z-0">
          <div className="w-6 h-6 rounded-full border border-white/20 border-t-[#f9b934] animate-spin opacity-40" />
        </div>
      )}

      {/* Modern Picture Element with WebP support and fallback */}
      {!hasError ? (
        <picture className="w-full h-full flex items-center justify-center">
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={currentSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`transition-opacity duration-500 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            {...props}
          />
        </picture>
      ) : (
        /* Fallback Art Frame in the rare case both local and remote fail */
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-black/40 text-white/40 p-6 text-center border border-white/10 rounded-2xl">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#f9b934]">
            [ ARCHIVE MEDIA // OPTIMIZED ]
          </span>
          <span className="text-xs font-mono mt-2 text-white/70">{alt}</span>
        </div>
      )}
    </div>
  );
}
