import { useState } from 'react';

interface ImageCarouselProps {
  images: { _sBaseUrl: string; _sFile: string }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const getImageUrl = (image: { _sBaseUrl: string; _sFile: string }) => {
    return `${image._sBaseUrl}/${image._sFile}`;
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-main-image-container">
        <img
          src={getImageUrl(images[currentImageIndex])}
          alt={`Image ${currentImageIndex + 1}`}
          className="carousel-main-image"
        />
        <button onClick={goToPrevious} className="carousel-button prev">
          &#10094;
        </button>
        <button onClick={goToNext} className="carousel-button next">
          &#10095;
        </button>
      </div>
      <div className="carousel-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={getImageUrl(image)}
            alt={`Thumbnail ${index + 1}`}
            className={`carousel-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
