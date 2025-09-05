import { useEffect } from "react";

export default function SparkleEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.card-hover, .nav-btn, button')) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'fixed';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.fontSize = '20px';
      sparkle.style.zIndex = '1001';
      sparkle.style.pointerEvents = 'none';
      sparkle.className = 'animate-sparkle';
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
