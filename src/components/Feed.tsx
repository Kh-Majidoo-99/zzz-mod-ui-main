import { useState, useEffect } from 'react';
import type { FeedItem } from '../types';
import FeedCard from './FeedCard'; // Import the new FeedCard component
import { useNavigate, useLocation } from 'react-router-dom';
// import CharacterList from './CharacterList'; // Import the CharacterList component



const Feed = () => { // Removed onItemSelect from props
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const [items, setItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState('mod'); // TODO: Add a UI element to change this
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  const fetchFeed = (pageNum: number, currentFilter: string) => {
    if (loading || !hasMore) return;
    setLoading(true);

    let url = `https://gamebanana.com/apiv11/Game/19567/Subfeed?_sSort=default&_nPage=${pageNum}`;
    if (searchQuery) {
      url += `&_sName=${searchQuery}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const records = data._aRecords || (Array.isArray(data) ? data : []);

        if (records.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }

        const filteredRecords = currentFilter
          ? records.filter((item: any) => item._sModelName.toLowerCase() === currentFilter.toLowerCase())
          : records;

        const mappedItems: FeedItem[] = filteredRecords.map((item: any) => ({
          id: item._idRow,
          author: item._aSubmitter?._sName || 'Unknown',
          title: item._sName || 'Untitled',
          imageUrl: item._aPreviewMedia?._aImages?.[0]
            ? `${item._aPreviewMedia._aImages[0]._sBaseUrl}/${item._aPreviewMedia._aImages[0]._sFile}`
            : '',
          link: item._sProfileUrl || '',
          text: item._sText || '',
          _sInitialVisibility: item._sInitialVisibility || undefined, // Map the new property
        }));

        setItems((prevItems) => {
          if (pageNum === 1) {
            return mappedItems;
          }
          const existingIds = new Set(prevItems.map(i => i.id));
          const newItems = mappedItems.filter(i => !existingIds.has(i.id));
          return [...prevItems, ...newItems];
        });

        setPage(pageNum + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching feed:', error);
        setLoading(false);
      });
  };

  // Effect for initial load and filter changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchFeed(1, filter);
  }, [filter, searchQuery]);

  // Effect for handling scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      // Don't fetch if we're already loading or there are no more items
      if (loading || !hasMore) return;

      // Check if the user has scrolled to the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        fetchFeed(page, filter);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, hasMore, filter, searchQuery]); // Re-add listener if these change

  return (
    <div className="main-container">
      <div className="feed-container">
        <h1>Scrollable Feed</h1>
        <div className="feed-list">
          {items.map((item) => (
            <FeedCard key={item.id} item={item} onNavigate={() => navigate(`/mod/${item.id}`)} /> // Pass navigate
          ))}
        </div>
        {loading && <div className="loading-indicator">Loading more...</div>}
        {!hasMore && <div className="loading-indicator">No more items to load.</div>}
      </div>
      {/* <CharacterList /> */}
    </div>
  );
};

export default Feed;
