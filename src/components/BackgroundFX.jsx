import { useEffect } from 'react';
import profileImage from '../assets/lisset-profile.png';

export default function BackgroundFX() {
  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
      });
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <div className="background-fx" aria-hidden="true">
      <div className="background-face" style={{ backgroundImage: `url(${profileImage})` }} />
      <div className="particle-field">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} style={{ '--i': index }} />
        ))}
      </div>
    </div>
  );
}
