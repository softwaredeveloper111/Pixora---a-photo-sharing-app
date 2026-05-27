
import PostCard from '../components/PostCard';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  // Rich mock data featuring high-contrast design, clean workspaces and architectures
  const mockPosts = [
    {
      id: 1,
      username: 'linear_app',
      userAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&q=80',
      location: 'San Francisco, CA',
      photoUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&fit=crop&q=80',
      likes: 1024,
      caption: 'Refining the cycles view. Focusing on depth, keyboard shortcuts, and performance. New build is now live.',
      tags: ['#linear', '#productdesign', '#minimal'],
      timeAgo: '2 hours ago',
      commentsList: [
        { username: 'rauchg', text: 'Stunning performance. Feels incredibly fast.' },
        { username: 'dev_guy', text: 'This design layout is absolutely flawless.' },
        { username: 'antigravity', text: 'Clean borders and precise contrast. Inspiring!' }
      ]
    },
    {
      id: 2,
      username: 'vercel_design',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80',
      location: 'Remote',
      photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop&q=80',
      likes: 853,
      caption: 'Our new design system focuses on the canvas: clean lines, absolute monochrome contrast, and breathable layout systems.',
      tags: ['#nextjs', '#designsystem', '#webdev'],
      timeAgo: '5 hours ago',
      commentsList: [
        { username: 'leeerob', text: 'The typography changes make such a big difference.' },
        { username: 'design_hound', text: 'Can we access the Figma file for this?' }
      ]
    },
    {
      id: 3,
      username: 'minimal_spaces',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80',
      location: 'Tokyo, Japan',
      photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&q=80',
      likes: 2401,
      caption: 'Concrete, light, and geometry. A studio designed by Tadao Ando in the heart of Tokyo.',
      tags: ['#architecture', '#tadaoando', '#concrete'],
      timeAgo: '1 day ago',
      commentsList: [
        { username: 'h_kahn', text: 'Concrete is the ultimate canvas.' }
      ]
    }
  ];

  const suggestions = [
    { username: 'rauchg', fullName: 'Guillermo Rauch', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&fit=crop&q=80' },
    { username: 'leeerob', fullName: 'Lee Robinson', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=80&fit=crop&q=80' },
    { username: 'shuding_', fullName: 'Shu Ding', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&fit=crop&q=80' }
  ];

  return (
    <div className={styles.feedWrapper}>
      {/* Centered Main Feed */}
      <section className={styles.feed}>
        <div className={styles.feedHeader}>
          <h2>Home</h2>
        </div>
        
        <div className={styles.postsList}>
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Right Sidebar Suggestions (Hidden on Mobile) */}
      <aside className={styles.suggestionsPanel}>
        <div className={styles.currentUser}>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80" 
            alt="your avatar" 
            className={styles.userAvatar} 
          />
          <div>
            <div className={styles.currentUsername}>you</div>
            <div className={styles.currentFullName}>Guest User</div>
          </div>
        </div>

        <div className={styles.suggestionsHeader}>
          <span>Suggestions for you</span>
          <button className={styles.seeAllBtn}>See All</button>
        </div>

        <div className={styles.suggestionsList}>
          {suggestions.map((user) => (
            <div key={user.username} className={styles.suggestionItem}>
              <div className={styles.suggestionUser}>
                <img src={user.avatar} alt={user.username} className={styles.suggestionAvatar} />
                <div>
                  <div className={styles.suggestionUsername}>{user.username}</div>
                  <div className={styles.suggestionFullName}>{user.fullName}</div>
                </div>
              </div>
              <button className={styles.followBtn}>Follow</button>
            </div>
          ))}
        </div>

        <footer className={styles.footerLinks}>
          <p>© 2026 PIXORA INC. INSPIRED BY VERCEL</p>
        </footer>
      </aside>
    </div>
  );
};

export default HomePage;
