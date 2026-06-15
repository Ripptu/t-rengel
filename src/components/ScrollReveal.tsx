import { useEffect, useRef, useMemo, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    return children.split(/\s+/).map((word, index, arr) => (
      <span key={index} className="word">
        {word}{index < arr.length - 1 ? ' ' : ''}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger is the element itself by default or a custom container if passed
    const triggerElement = scrollContainerRef?.current || el;

    // 1. Rotation: rotates from baseRotation to 0
    const rotateAnim = gsap.fromTo(
      el,
      { rotate: baseRotation, transformOrigin: '0% 50%' },
      {
        rotate: 0,
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    // Get all words inside the container
    const words = el.querySelectorAll('.word');

    // 2. Opacity: each word fades from baseOpacity to 1
    const opacityAnim = gsap.fromTo(
      words,
      { opacity: baseOpacity },
      {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    let blurAnim: gsap.core.Tween | null = null;
    // 3. Blur Animation (if enabled): from blur(...) to blur(0px)
    if (enableBlur && words.length > 0) {
      blurAnim = gsap.fromTo(
        words,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    // Cleanup animations and ScrollTriggers on unmount
    return () => {
      if (rotateAnim.scrollTrigger) rotateAnim.scrollTrigger.kill();
      rotateAnim.kill();

      if (opacityAnim.scrollTrigger) opacityAnim.scrollTrigger.kill();
      opacityAnim.kill();

      if (blurAnim) {
        if (blurAnim.scrollTrigger) blurAnim.scrollTrigger.kill();
        blurAnim.kill();
      }
    };
  }, [
    scrollContainerRef,
    baseRotation,
    rotationEnd,
    baseOpacity,
    wordAnimationEnd,
    enableBlur,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
