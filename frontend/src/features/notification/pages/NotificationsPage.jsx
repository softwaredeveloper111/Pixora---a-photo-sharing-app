import React, { useState } from 'react';
import { Heart, MessageSquare, UserPlus, Check, X } from 'lucide-react';
import styles from './NotificationsPage.module.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'follow_request',
      username: 'alex_mercer',
      fullName: 'Alex Mercer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=80',
      time: '10m ago',
      status: 'pending' // pending, accepted, rejected
    },
    {
      id: 2,
      type: 'like',
      username: 'rauchg',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&fit=crop&q=80',
      postPhoto: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&fit=crop&q=80',
      time: '1h ago'
    },
    {
      id: 3,
      type: 'comment',
      username: 'leeerob',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=80&fit=crop&q=80',
      postPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&fit=crop&q=80',
      text: 'The layout looks incredibly sharp.',
      time: '3h ago'
    },
    {
      id: 4,
      type: 'follow_request',
      username: 'sara_d',
      fullName: 'Sara Diaz',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80',
      time: '5h ago',
      status: 'pending'
    },
    {
      id: 5,
      type: 'like',
      username: 'shuding_',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&fit=crop&q=80',
      postPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80&fit=crop&q=80',
      time: '1d ago'
    }
  ]);

  const handleAcceptRequest = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'accepted' } : notif
      )
    );
  };

  const handleRejectRequest = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'rejected' } : notif
      )
    );
    // Optionally remove from list after short duration
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id || notif.status !== 'rejected'));
    }, 1000);
  };

  return (
    <div className={styles.notificationsContainer}>
      <header className={styles.header}>
        <h2>Notifications</h2>
      </header>

      <div className={styles.list}>
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            return (
              <div 
                key={notif.id} 
                className={`${styles.notificationItem} ${
                  notif.status === 'rejected' ? styles.rejectedItem : ''
                }`}
              >
                <div className={styles.leftCol}>
                  <img src={notif.avatar} alt={notif.username} className={styles.avatar} />
                  <div className={styles.details}>
                    <div className={styles.content}>
                      <span className={styles.username}>{notif.username}</span>
                      
                      {notif.type === 'like' && ' liked your photo.'}
                      {notif.type === 'comment' && (
                        <span>
                          {' commented: '}
                          <span className={styles.commentText}>"{notif.text}"</span>
                        </span>
                      )}
                      {notif.type === 'follow_request' && (
                        <span>
                          {notif.status === 'accepted'
                            ? ' is now following you.'
                            : ' requested to follow you.'}
                        </span>
                      )}
                    </div>
                    <span className={styles.time}>{notif.time}</span>
                  </div>
                </div>

                <div className={styles.rightCol}>
                  {/* Action icons or button groups */}
                  {notif.type === 'like' && (
                    <img src={notif.postPhoto} alt="post preview" className={styles.postPreview} />
                  )}
                  {notif.type === 'comment' && (
                    <img src={notif.postPhoto} alt="post preview" className={styles.postPreview} />
                  )}
                  {notif.type === 'follow_request' && (
                    <div className={styles.actions}>
                      {notif.status === 'pending' && (
                        <>
                          <button 
                            className={styles.acceptBtn} 
                            onClick={() => handleAcceptRequest(notif.id)}
                            title="Accept"
                          >
                            <Check size={14} />
                            <span>Accept</span>
                          </button>
                          <button 
                            className={styles.rejectBtn} 
                            onClick={() => handleRejectRequest(notif.id)}
                            title="Reject"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {notif.status === 'accepted' && (
                        <span className={styles.statusText}>Following</span>
                      )}
                      {notif.status === 'rejected' && (
                        <span className={styles.statusTextRejected}>Dismissed</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <p>You're all caught up. No notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
