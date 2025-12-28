import { useState, useEffect } from 'react';
import type { FeedItem } from '../types';
import ProfileCard from './ProfileCard';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const CardProfile = () => { // Remove id and goBack from props
  const { id } = useParams<{ id: string }>(); // Get id from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const [profileData, setProfileData] = useState<FeedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { // Handle case where id might be undefined
      setError('Profile ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`https://gamebanana.com/apiv11/Mod/${id}/ProfilePage`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }
        return res.json();
      })
      .then((data) => {
        const mappedData: FeedItem = {
          id: data._idRow,
          author: data._aSubmitter?._idRow ? `https://gamebanana.com/members/${data._aSubmitter._idRow}` : 'Unknown',
          title: data._sName || 'Untitled',
          imageUrl: data._aPreviewMedia?._aImages?.[0]
            ? `${data._aPreviewMedia._aImages[0]._sBaseUrl}/${data._aPreviewMedia._aImages[0]._sFile}`
            : '',
          link: data._sProfileUrl || '',
          text: data._sText || '',
          // Assuming the structure is similar to the subfeed
          ...(data as any),
        };
        setProfileData(mappedData);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error fetching profile data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Depend on id from useParams

  if (loading) {
    return <div className="feed-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="feed-container">Error: {error}</div>;
  }

  if (!profileData) {
    return <div className="feed-container">No profile data available.</div>;
  }

  if (!profileData) {
    return <div className="feed-container">No profile data available.</div>;
  }

  return (
    <div className="feed-container">
      <button onClick={() => navigate(-1)} className="back-button"> {/* Use navigate(-1) for back */}
        Back
      </button>
      <ProfileCard profileData={profileData} />
    </div>
  );
};


export default CardProfile;
