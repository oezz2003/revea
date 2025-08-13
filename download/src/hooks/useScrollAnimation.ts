
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimationOptions {
  delay?: number;
  duration?: number;
  y?: number;
}

export function useScrollAnimation<T extends HTMLElement>(options: AnimationOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: options.y || 50 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: options.duration || 0.8,
            delay: options.delay || 0,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.delay, options.duration, options.y]);

  return ref;
}
