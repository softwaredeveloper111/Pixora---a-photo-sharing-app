import { useState } from 'react';
import { Search, Heart, MessageCircle } from 'lucide-react';
import styles from './ExplorePage.module.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Public explore items (workspaces, typography, hardware, architecture)
  const allItems = [
    {
      id: 1,
      photoUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&fit=crop&q=80',
      likes: 342,
      comments: 18,
      category: 'workspaces'
    },
    {
      id: 2,
      photoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&fit=crop&q=80',
      likes: 890,
      comments: 42,
      category: 'tech'
    },
    {
      id: 3,
      photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&fit=crop&q=80',
      likes: 1205,
      comments: 73,
      category: 'architecture'
    },
    {
      id: 4,
      photoUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&fit=crop&q=80',
      likes: 412,
      comments: 11,
      category: 'minimal'
    },
    {
      id: 5,
      photoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop&q=80',
      likes: 654,
      comments: 29,
      category: 'tech'
    },
    {
      id: 6,
      photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&fit=crop&q=80',
      likes: 1340,
      comments: 95,
      category: 'architecture'
    },
    {
      id: 7,
      photoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&fit=crop&q=80',
      likes: 1856,
      comments: 142,
      category: 'code'
    },
    {
      id: 8,
      photoUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&fit=crop&q=80',
      likes: 924,
      comments: 31,
      category: 'tech'
    },
    {
      id: 9,
      photoUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&fit=crop&q=80',
      likes: 721,
      comments: 22,
      category: 'workspaces'
    }
  ];

  // Filtering based on search (either categories, or basic mock hashtag matching)
  const filteredItems = allItems.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().replace('#', '');
    return item.category.includes(query) || (query === 'all');
  });

  return (
    <div className={styles.exploreWrapper}>
      {/* Top Search Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search tags, topics (e.g. tech, code, architecture)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Topics/Tabs Suggestions */}
      <div className={styles.topicTabs}>
        {['All', 'Workspaces', 'Tech', 'Architecture', 'Code', 'Minimal'].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${
              (searchQuery.toLowerCase() === tab.toLowerCase() || (!searchQuery && tab === 'All'))
                ? styles.activeTab
                : ''
            }`}
            onClick={() => setSearchQuery(tab === 'All' ? '' : tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of Public Photos */}
      {filteredItems.length > 0 ? (
        <div className={styles.photoGrid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              <img src={item.photoUrl} alt="Explore content" className={styles.gridPhoto} />
              
              {/* Hover Stats Overlay */}
              <div className={styles.gridOverlay}>
                <div className={styles.statsRow}>
                  <span className={styles.stat}>
                    <Heart size={18} fill="currentColor" />
                    <span>{item.likes}</span>
                  </span>
                  <span className={styles.stat}>
                    <MessageCircle size={18} fill="currentColor" />
                    <span>{item.comments}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>No posts found for "{searchQuery}"</p>
          <button className={styles.resetBtn} onClick={() => setSearchQuery('')}>Clear Search</button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
