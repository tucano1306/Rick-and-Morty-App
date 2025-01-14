// GifGallery.jsx
import { useRef } from 'react';

function GifGallery() {
  const scrollContainerRef = useRef(null);

  const gifs = [
    '/background/200.webp',
    '/background/201.webp',
    '/background/202.webp',
    '/background/203.webp'
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="gifs-container">
      <button 
        onClick={scrollLeft} 
        className="scroll-button left"
        aria-label="Scroll left"
      >
        &lt;
      </button>
      <div className="gifs-wrapper" ref={scrollContainerRef}>
        {gifs.map((gif, index) => (
          <div key={index} className="gif-item">
            <img 
              src={gif} 
              alt={`Rick and Morty Gif ${index + 1}`} 
              className="gif-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <button 
        onClick={scrollRight} 
        className="scroll-button right"
        aria-label="Scroll right"
      >
        &gt;
      </button>
    </div>
  );
}

export default GifGallery;