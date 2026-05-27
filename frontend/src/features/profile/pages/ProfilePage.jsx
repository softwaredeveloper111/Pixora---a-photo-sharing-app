import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Settings, Grid, Bookmark, Users, Heart, MessageCircle } from 'lucide-react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock profiles database
  const profiles = {
    you: {
      username: 'you',
      fullName: 'Guest User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&fit=crop&q=80',
      bio: 'Minimalist designer and developer. Building the future of high-contrast photography apps. Inspired by Vercel and Linear.',
      postsCount: 3,
      followers: 128,
      following: 95,
      posts: [
        { id: 101, photoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&fit=crop&q=80', likes: 24, comments: 2 },
        { id: 102, photoUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&fit=crop&q=80', likes: 18, comments: 0 },
        { id: 103, photoUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&fit=crop&q=80', likes: 31, comments: 5 }
      ]
    },
    vercel: {
      username: 'vercel_design',
      fullName: 'Vercel Design Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80',
      bio: 'Designers at Vercel. Crafting frontend experiences. Creators of Next.js and Geist Design Systems.',
      postsCount: 4,
      followers: 14205,
      following: 38,
      posts: [
        { id: 201, photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&fit=crop&q=80', likes: 853, comments: 48 },
        { id: 202, photoUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&fit=crop&q=80', likes: 622, comments: 12 },
        { id: 203, photoUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&fit=crop&q=80', likes: 789, comments: 25 },
        { id: 204, photoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop&q=80', likes: 902, comments: 40 }
      ]
    },
    linear: {
      username: 'linear_app',
      fullName: 'Linear App',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&fit=crop&q=80',
      bio: 'The issue tracker you’ve been waiting for. Built for high-performance product teams.',
      postsCount: 3,
      followers: 24890,
      following: 12,
      posts: [
        { id: 301, photoUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&fit=crop&q=80', likes: 1024, comments: 34 },
        { id: 302, photoUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&fit=crop&q=80', likes: 924, comments: 19 },
        { id: 303, photoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&fit=crop&q=80', likes: 1205, comments: 41 }
      ]
    }
  };

  // Resolve profile based on URL username param
  const profileKey = username ? username.toLowerCase() : 'you';
  const profile = profiles[profileKey] || profiles.you;
  const isOwnProfile = profile.username === 'you';

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={styles.profileWrapper}>
      {/* Cover Banner */}
      <div className={styles.coverArea}>
        <img src={profile.cover} alt="Profile Cover" className={styles.coverImage} />
        <div className={styles.coverOverlay}></div>
      </div>

      {/* Profile Header Detail */}
      <header className={styles.profileHeader}>
        <div className={styles.headerTop}>
          <div className={styles.avatarContainer}>
            <img src={profile.avatar} alt={profile.fullName} className={styles.avatar} />
          </div>
          
          <div className={styles.actionRow}>
            {isOwnProfile ? (
              <>
                <button className={styles.editBtn} onClick={() => alert('Edit Profile clicked')}>
                  Edit Profile
                </button>
                <button className={styles.iconBtn} onClick={() => alert('Settings clicked')}>
                  <Settings size={16} />
                </button>
              </>
            ) : (
              <button 
                className={`${styles.followBtn} ${isFollowing ? styles.followingActiveBtn : ''}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.fullName}>{profile.fullName}</h2>
          <div className={styles.usernameTag}>@{profile.username}</div>
          <p className={styles.bioText}>{profile.bio}</p>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>{profile.postsCount}</span>
            <span className={styles.statLabel}>posts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>{profile.followers.toLocaleString()}</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>{profile.following.toLocaleString()}</span>
            <span className={styles.statLabel}>following</span>
          </div>
        </div>
      </header>

      {/* Tabs Menu */}
      <div className={styles.tabsMenu}>
        <button 
          className={`${styles.tabLink} ${activeTab === 'posts' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={14} />
          <span>Posts</span>
        </button>
        {isOwnProfile && (
          <button 
            className={`${styles.tabLink} ${activeTab === 'saved' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={14} />
            <span>Saved</span>
          </button>
        )}
      </div>

      {/* Grid Content */}
      <div className={styles.postsGrid}>
        {profile.posts.map((post) => (
          <div key={post.id} className={styles.gridItem}>
            <img src={post.photoUrl} alt="User post" className={styles.gridPhoto} />
            
            {/* Stats Overlay */}
            <div className={styles.gridOverlay}>
              <div className={styles.statsRowOverlay}>
                <span className={styles.statItemOverlay}>
                  <Heart size={16} fill="currentColor" />
                  <span>{post.likes}</span>
                </span>
                <span className={styles.statItemOverlay}>
                  <MessageCircle size={16} fill="currentColor" />
                  <span>{post.comments}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
