// GifGallery.jsx
function GifGallery() {
  const gifs = [
    '/background/200.webp',
    '/background/201.webp',
    '/background/202.webp',
    '/background/203.webp'
  ];

  return (
    <div className="gifs-container">
      <div className="gifs-wrapper">
        {gifs.map((gif, index) => (
          <div key={index} className="gif-item">
            <img 
              src={gif} 
              alt={`Rick and Morty Gif ${index + 1}`} 
              className="gif-image"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GifGallery;