import React from 'react';
import type { FeedItem } from '../types';
import ImageCarousel from './ImageCarousel';

interface ProfileCardProps {
    profileData: FeedItem;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
    const images = (profileData as any)._aPreviewMedia?._aImages || [];

    return (
        <div className="profile-card">
            {images.length > 0 && (
                <div className="carousel-section">
                    <h2>Images</h2>
                    <ImageCarousel images={images} />
                </div>
            )}

            <h1>{profileData.title}</h1>
            <p><strong>Author:</strong> {profileData.author}</p>
            <p><strong>ID:</strong> {profileData.id}</p>
            <p><a href={profileData.link} target="_blank" rel="noreferrer">View on GameBanana</a></p>
            {(profileData as any)._sText && (
                <div className="feed-text" dangerouslySetInnerHTML={{ __html: (profileData as any)._sText }} />
            )}
        </div>
    );
};

export default ProfileCard;
