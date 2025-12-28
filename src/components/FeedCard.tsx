import { useState } from 'react';
import nsfwPlaceholder from '../assets/nsfw.jpg';
import type { FeedItem } from '../types';

interface FeedCardProps {
  item: FeedItem;
  onNavigate: () => void; // Changed from onItemSelect
}

const FeedCard = ({ item, onNavigate }: FeedCardProps) => { // Changed from onItemSelect
  const [showImage, setShowImage] = useState(item._sInitialVisibility === 'hide' ? false : true);

  const handleCardClick = () => {
    if (!showImage && item._sInitialVisibility === 'hide') {
      setShowImage(true);
    } else {
      onNavigate(); // Use onNavigate for navigation
    }
  };

  return (
    <div
      key={item.id}
      className="feed-card"
      onClick={handleCardClick}
    >
      {item.imageUrl && showImage && <img src={item.imageUrl} alt={item.title} className="feed-image" />}
      {item.imageUrl && !showImage && item._sInitialVisibility === 'hide' && (
        <img src={nsfwPlaceholder} alt="Hidden Content" className="feed-image" />
      )}
      <h4 style={{ margin: 0 }}>{item.title}</h4>
      {/* <p>By {item.author}</p> */}
    </div>
  );
};

export default FeedCard;