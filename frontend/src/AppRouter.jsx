import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/auth/pages/AuthPage';
import HomePage from './features/home/pages/HomePage';
import ExplorePage from './features/explore/pages/ExplorePage';
import NotificationsPage from './features/notification/pages/NotificationsPage';
import MessagesPage from './features/message/pages/MessagesPage';
import ProfilePage from './features/profile/pages/ProfilePage';
import Layout from './features/home/components/Layout';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Auth Route */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* App Shell (Authenticated Layout Wrapper) */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Route>

      {/* Redirect all unmatched routes to Feed */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
