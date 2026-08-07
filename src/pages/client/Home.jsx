import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/home/Hero';
import CategoryCoverGrid from '../../components/collections/CategoryCoverGrid';

const Home = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!hero || !content) return;

    const heroHeight = hero.offsetHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Parallax: hero moves up at half the scroll speed
      const parallaxOffset = scrollY * 0.4;
      hero.style.transform = `translateY(-${parallaxOffset}px)`;

      // Content slides in: starts below hero, slides up on scroll
      const overlap = Math.max(0, scrollY - heroHeight * 0.6);
      content.style.transform = `translateY(-${overlap * 0.5}px)`;
    };

    // Also listen on Lenis scroll if available
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-background relative">
      <Helmet>
        <title>JV GOLD & CO LLC - Alta Relojería y Joyería Exclusiva</title>
        <meta name="description" content="Descubre la colección más exclusiva de joyería, anillos, relojes y accesorios premium. Elegancia intemporal." />
      </Helmet>

      {/* Hero with parallax */}
      <div ref={heroRef} className="relative z-0 will-change-transform">
        <Hero />
      </div>

      {/* Content that slides over the Hero */}
      <section
        ref={contentRef}
        className="w-full relative z-10 bg-[#1a1410] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] will-change-transform"
        style={{ marginTop: '-60px' }}
      >
        <CategoryCoverGrid />
      </section>
    </div>
  );
};

export default Home;
