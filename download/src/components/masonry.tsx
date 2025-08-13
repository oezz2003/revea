
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const handler = () => setValue(get);
    window.addEventListener("resize", handler);
    setValue(get); // Set initial value
    return () => window.removeEventListener("resize", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 1.05,
  blurToFocus = false,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  const getInitialPosition = (item: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right", "center"];
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !width) return;

    // Initial animation on visibility
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline({
        defaults: {
            duration,
            ease,
        },
      });

      grid.forEach((item, i) => {
        const selector = `[data-key="${item.id}"]`;
        const start = getInitialPosition(item);
        
        tl.fromTo(selector, 
          { 
            x: start.x, 
            y: start.y, 
            opacity: 0,
            ...(blurToFocus && { filter: "blur(20px)" }),
          },
          { 
            x: item.x, 
            y: item.y,
            opacity: 1,
            ...(blurToFocus && { filter: "blur(0px)" }),
          },
          i * stagger
        );
      });
    }

    // Handle resizing after initial animation
    if (hasAnimated.current) {
        grid.forEach((item) => {
            const selector = `[data-key="${item.id}"]`;
            gsap.to(selector, {
                x: item.x,
                y: item.y,
                width: item.w,
                height: item.h,
                duration: 0.4, // Faster resize adjustment
                ease: 'power2.out',
                overwrite: "auto",
            });
        });
    }
  }, [grid, imagesReady, isVisible, stagger, animateFrom, blurToFocus, duration, ease, width]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
        gsap.to(`[data-key="${id}"] .masonry-image`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out"
        });
    }
    
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      const text = element.querySelector(".overlay-text") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 });
      if (text) gsap.to(text, { opacity: 1, y: 0, duration: 0.3, delay: 0.1 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
        gsap.to(`[data-key="${id}"] .masonry-image`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
        });
    }
    
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      const text = element.querySelector(".overlay-text") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
      if (text) gsap.to(text, { opacity: 0, y: 10, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {grid.map((item) => (
        <a
          key={item.id}
          data-key={item.id}
          data-masonry-item
          href={item.url}
          className="absolute box-content cursor-pointer"
          style={{ 
            willChange: "transform, width, height, opacity",
            opacity: 0, // Start with opacity 0 for animation
            width: item.w,
            height: item.h,
            transform: `translate(${item.x}px, ${item.y}px)`
          }}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full rounded-[10px] overflow-hidden shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
          >
            <div
              className="masonry-image w-full h-full bg-cover bg-center transition-transform duration-300"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 bg-neutral-900/60 opacity-0 pointer-events-none flex items-center justify-center p-4">
                <p className="overlay-text font-headline text-xl font-bold text-white text-center opacity-0 transform translate-y-2 transition-all duration-300">
                  Style Unveiled
                </p>
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default Masonry;
