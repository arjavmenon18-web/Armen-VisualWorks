import React, { useState, useEffect, useRef, useMemo } from "react";

// Global dictionary of high-reliability fallback sources for all known app images
const GLOBAL_IMAGE_FALLBACKS: Record<string, string[]> = {
  "mee": [
    "https://i.postimg.cc/jSRYZTB0/mee.png",
    "/images/mee.png"
  ],
  "p01": [
    "https://i.postimg.cc/fLZ4Mh16/Whats-App-Image-2026-05-02-at-10-44-44-PM.jpg",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1400&auto=format&fit=crop"
  ],
  "p02": [
    "https://i.postimg.cc/pTxNPt3w/Whats-App-Image-2026-05-02-at-10-45-22-PM.jpg",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop"
  ],
  "p03": [
    "https://i.postimg.cc/B6sWJGRR/Whats-App-Image-2026-05-02-at-10-45-51-PM.jpg",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop"
  ],
  "p04": [
    "https://i.postimg.cc/zB5mq14P/Whats-App-Image-2026-05-02-at-10-46-23-PM.jpg",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
  ],
  "p05": [
    "https://i.postimg.cc/k49r7dLY/Whats-App-Image-2026-05-02-at-10-46-57-PM.jpg",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1400&auto=format&fit=crop"
  ],
  "p06": [
    "https://i.postimg.cc/Y9kctwTd/Whats-App-Image-2026-05-02-at-10-47-31-PM.jpg",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop"
  ],
  "p07": [
    "https://i.postimg.cc/26mpCfgw/Whats-App-Image-2026-05-02-at-10-47-39-PM.jpg",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop"
  ],
  "p08": [
    "https://i.postimg.cc/QtsLjrvJ/Whats-App-Image-2026-05-02-at-10-48-07-PM.jpg",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1400&auto=format&fit=crop"
  ],
  "p09": [
    "https://i.postimg.cc/26mpCfg4/Whats-App-Image-2026-05-02-at-10-49-34-PM.jpg",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop"
  ],
  "p10": [
    "https://i.postimg.cc/4dZCXTjH/Whats-App-Image-2026-05-02-at-10-50-09-PM.jpg",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1400&auto=format&fit=crop"
  ],
  "p11": [
    "https://i.postimg.cc/Ssq0mpHz/Whats-App-Image-2026-05-02-at-10-52-36-PM.jpg",
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1400&auto=format&fit=crop"
  ],
  "p12": [
    "https://i.postimg.cc/zB5mq14h/Whats-App-Image-2026-05-02-at-10-54-15-PM.jpg",
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1400&auto=format&fit=crop"
  ],
  "p13": [
    "https://i.postimg.cc/HxHGTCFc/Whats-App-Image-2026-05-02-at-10-55-45-PM.jpg",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1400&auto=format&fit=crop"
  ],
  "p14": [
    "https://i.postimg.cc/Zq6tkqs8/Whats-App-Image-2026-05-02-at-10-56-06-PM.jpg",
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1400&auto=format&fit=crop"
  ],
  "p15": [
    "https://i.postimg.cc/vm5FRm2W/Whats-App-Image-2026-05-02-at-10-57-20-PM.jpg",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1400&auto=format&fit=crop"
  ],
  "p16": [
    "https://i.postimg.cc/Dz1kVzpQ/Whats-App-Image-2026-05-02-at-10-57-45-PM.jpg",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1400&auto=format&fit=crop"
  ],
  "p17": [
    "https://i.postimg.cc/nLqb8LSY/Whats-App-Image-2026-05-05-at-6-53-00-PM.jpg",
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1400&auto=format&fit=crop"
  ],
  "p18": [
    "https://i.postimg.cc/hGVWFGZJ/Whats-App-Image-2026-05-05-at-7-29-37-PM.jpg",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1400&auto=format&fit=crop"
  ],
  "archive_01": [
    "https://i.postimg.cc/hGK9FYff/Archive-1.png",
    "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=1400&auto=format&fit=crop"
  ],
  "archive_02": [
    "https://i.postimg.cc/d0nGJ9ys/Archive-02.png",
    "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1400&auto=format&fit=crop"
  ],
  "film_trail_01": [
    "/images/film_trail_01.png",
    "/images/film_trail_01.webp",
    "https://i.ibb.co/YTXsyz4b/Whats-App-Image-2026-08-18-at-7-38-22-PM.png",
    "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1400&auto=format&fit=crop"
  ],
  "film_trail_02": [
    "/images/film_trail_02.png",
    "/images/film_trail_02.webp",
    "https://i.ibb.co/nqPMVVVC/Chat-GPT-Image-Aug-18-2026-07-27-27-PM.png",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop"
  ]
};

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
  const imgRef = useRef<HTMLImageElement>(null);

  // Compute candidate sources in priority order
  const candidateList = useMemo(() => {
    const list: string[] = [];

    const addIfValid = (item?: string) => {
      if (item && typeof item === "string" && item.trim() !== "" && !list.includes(item)) {
        list.push(item);
      }
    };

    // 1. If local existing src or primary src is provided, prioritize it
    addIfValid(src);
    addIfValid(fallbackSrc);
    addIfValid(webpSrc);

    // 2. Look up dictionary fallbacks by key in the filename
    const allPaths = [src, webpSrc, fallbackSrc].filter(Boolean).join(" ");
    for (const [key, fallbacks] of Object.entries(GLOBAL_IMAGE_FALLBACKS)) {
      if (allPaths.toLowerCase().includes(key.toLowerCase())) {
        fallbacks.forEach(addIfValid);
      }
    }

    // 3. Unsplash high-res fallbacks if needed
    if (list.length === 0) {
      list.push("https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1400&auto=format&fit=crop");
    }

    return list;
  }, [src, fallbackSrc, webpSrc]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAllFailed, setHasAllFailed] = useState(false);

  // Reset state when sources change
  useEffect(() => {
    setCandidateIndex(0);
    setIsLoaded(false);
    setHasAllFailed(false);
  }, [candidateList]);

  const activeSrc = candidateList[candidateIndex] || src;

  // Check if image is already cached / completed on mount or src change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [candidateIndex, activeSrc]);

  const handleImageError = () => {
    if (candidateIndex < candidateList.length - 1) {
      // Try next candidate
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasAllFailed(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasAllFailed(false);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Sleek Skeleton Placeholder while loading */}
      {!isLoaded && !hasAllFailed && (
        <div className="absolute inset-0 bg-neutral-900/60 animate-pulse backdrop-blur-xs flex items-center justify-center pointer-events-none z-0">
          <div className="w-6 h-6 rounded-full border border-white/20 border-t-[#f9b934] animate-spin opacity-60" />
        </div>
      )}

      {/* Primary Image Element */}
      {!hasAllFailed ? (
        <img
          ref={imgRef}
          src={activeSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-opacity duration-300 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...props}
        />
      ) : (
        /* Aesthetic Fallback Artwork Plate in case all network endpoints fail */
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[#111111] text-white/50 p-6 text-center border border-white/10 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f9b934]/10 via-transparent to-transparent pointer-events-none" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#f9b934] font-black z-10">
            [ ARMEN VISUALWORKS // ARCHIVE RAW ]
          </span>
          <span className="text-xs font-mono mt-2 text-white/80 font-bold z-10 max-w-xs uppercase">
            {alt}
          </span>
          <span className="text-[9px] font-mono mt-1 text-white/40 z-10">
            DCI-P3 8K DIGITAL PLATE
          </span>
        </div>
      )}
    </div>
  );
}

