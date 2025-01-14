function GifGallery() {
    const gifs = [
      '/background/200.webp',
      '/background/201.webp',
      '/background/202.webp',
      '/background/203.webp'
    ];
  
    return (
      <div className="gif-gallery">
        <h2 className="gif-gallery__title">Rick and Morty GIFs</h2>
        <div className="gif-gallery__container">
          {gifs.map((gif, index) => (
            <div key={index} className="gif-card">
              <img src={gif} alt={`Rick and Morty Gif ${index + 1}`} className="gif-card__image" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default GifGallery;