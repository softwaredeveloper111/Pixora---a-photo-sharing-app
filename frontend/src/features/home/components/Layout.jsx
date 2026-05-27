import  { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Compass, MessageSquare, Bell, User, PlusSquare, LogOut, X } from 'lucide-react';
import UploadModal from '../../upload/components/UploadModal';
import styles from '../styles/Layout.module.css';

const Layout = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Just navigate to auth for demo purposes
    navigate('/auth');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className={styles.layout}>
      {/* Desktop Left Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.topSection}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            <span>Pixora</span>
          </div>
          
          <nav className={styles.navMenu}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    isActive && !isSearchOpen ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                  onClick={() => setIsSearchOpen(false)}
                >
                  <Icon size={20} className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Desktop Search Toggle */}
            <button 
              className={`${styles.navLink} ${isSearchOpen ? styles.activeLink : ''}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} className={styles.navIcon} />
              <span className={styles.navLabel}>Search</span>
            </button>

            {/* Desktop Upload Trigger */}
            <button 
              className={styles.navLink}
              onClick={() => setIsUploadOpen(true)}
            >
              <PlusSquare size={20} className={styles.navIcon} />
              <span className={styles.navLabel}>Create</span>
            </button>
          </nav>
        </div>

        <div className={styles.bottomSection}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} className={styles.navIcon} />
            <span className={styles.navLabel}>Log out</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar Search Panel Overlay (Vercel/Linear style drawer) */}
      <div className={`${styles.searchDrawer} ${isSearchOpen ? styles.searchDrawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h3>Search</h3>
          <button className={styles.closeDrawer} onClick={() => setIsSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchFieldIcon} />
            <input 
              type="text" 
              placeholder="Search users or #hashtags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          {searchQuery && (
            <div className={styles.searchResults}>
              <div className={styles.searchSectionTitle}>Recent Searches</div>
              <div className={styles.searchResultItem} onClick={() => { navigate('/explore'); setIsSearchOpen(false); }}>
                <span className={styles.avatarPlaceholder}>#</span>
                <div>
                  <div className={styles.resultName}>#minimalism</div>
                  <div className={styles.resultMuted}>124k posts</div>
                </div>
              </div>
              <div className={styles.searchResultItem} onClick={() => { navigate('/profile/vercel'); setIsSearchOpen(false); }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80" alt="avatar" className={styles.resultAvatar} />
                <div>
                  <div className={styles.resultName}>vercel_design</div>
                  <div className={styles.resultMuted}>Vercel Design Team</div>
                </div>
              </div>
              <div className={styles.searchResultItem} onClick={() => { navigate('/profile/linear'); setIsSearchOpen(false); }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80" alt="avatar" className={styles.resultAvatar} />
                <div>
                  <div className={styles.resultName}>linear_app</div>
                  <div className={styles.resultMuted}>Linear App</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Top Header */}
      <header className={styles.mobileHeader}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <span>Pixora</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search size={20} />
          </button>
          <button className={styles.headerBtn} onClick={() => navigate('/notifications')}>
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileBottomNav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                isActive ? `${styles.mobileNavLink} ${styles.mobileActiveLink}` : styles.mobileNavLink
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
        <button 
          className={styles.mobileNavLink}
          onClick={() => setIsUploadOpen(true)}
        >
          <PlusSquare size={22} />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className={`${styles.mainContent} ${isSearchOpen ? styles.mainWithSearchShift : ''}`}>
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </main>

      {/* Upload Post Modal */}
      {isUploadOpen && (
        <UploadModal onClose={() => setIsUploadOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
