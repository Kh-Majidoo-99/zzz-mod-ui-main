import { useState, useEffect } from 'react';
import type { FeedItem } from '../types';
import FeedCard from './FeedCard';
import { useNavigate, useParams } from 'react-router-dom';

const Author = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [items, setItems] = useState<FeedItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [authorName, setAuthorName] = useState<string>('');

    const fetchFeed = (pageNum: number) => {
        if (loading || !hasMore || !id) return;
        setLoading(true);

        let url = `https://gamebanana.com/apiv11/Member/${id}/Submissions/Sublog?_nPage=${pageNum}&_sSort=p_date&_sDirection=DESC&_sNameOperator=contains`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const records = data._aRecords || (Array.isArray(data) ? data : []);

                if (records.length === 0) {
                    setHasMore(false);
                    setLoading(false);
                    return;
                }

                // Set author name from the first record if available and not set
                if (!authorName && records.length > 0 && records[0]._aSubmitter?._sName) {
                    setAuthorName(records[0]._aSubmitter._sName);
                }

                const mappedItems: FeedItem[] = records.map((item: any) => ({
                    id: item._idRow,
                    author: item._aSubmitter?._sName || 'Unknown',
                    authorId: item._aSubmitter?._idRow,
                    title: item._sName || 'Untitled',
                    imageUrl: item._aPreviewMedia?._aImages?.[0]
                        ? `${item._aPreviewMedia._aImages[0]._sBaseUrl}/${item._aPreviewMedia._aImages[0]._sFile}`
                        : '',
                    link: item._sProfileUrl || '',
                    text: item._sText || '',
                    _sInitialVisibility: item._sInitialVisibility || undefined,
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
                console.error('Error fetching author feed:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setItems([]);
        setPage(1);
        setHasMore(true);
        fetchFeed(1);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                fetchFeed(page);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, page, hasMore, id]);

    return (
        <div className="main-container">
            <div className="feed-container">
                <h1>{authorName ? `${authorName}'s Mods` : 'Author Feed'}</h1>
                <button onClick={() => navigate(-1)} className="back-button" style={{ marginBottom: '1rem' }}>
                    Back
                </button>
                <div className="feed-list">
                    {items.map((item) => (
                        <FeedCard key={item.id} item={item} onNavigate={() => navigate(`/mod/${item.id}`)} />
                    ))}
                </div>
                {loading && <div className="loading-indicator">Loading more...</div>}
                {!hasMore && items.length > 0 && <div className="loading-indicator">No more items to load.</div>}
                {!hasMore && items.length === 0 && !loading && <div className="loading-indicator">No items found for this author.</div>}
            </div>
        </div>
    );
};

export default Author;
