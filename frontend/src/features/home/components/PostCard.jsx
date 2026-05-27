import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.commentsList || []);
  const [newComment, setNewComment] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const commentObj = {
      username: 'you',
      text: newComment.trim()
    };
    
    setComments((prev) => [...prev, commentObj]);
    setNewComment('');
  };

  const handleShare = () => {
    setShareStatus('Copied link!');
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`).catch(() => {});
    setTimeout(() => setShareStatus(''), 2000);
  };

  return (
    <article className={styles.postCard}>
      {/* Header */}
      <header className={styles.postHeader}>
        <div className={styles.userInfo}>
          <img src={post.userAvatar} alt={post.username} className={styles.userAvatar} />
          <div>
            <span className={styles.username}>{post.username}</span>
            {post.location && <span className={styles.location}>{post.location}</span>}
          </div>
        </div>
        <button className={styles.optionsBtn}>
          <MoreHorizontal size={18} />
        </button>
      </header>

      {/* Photo */}
      <div className={styles.photoContainer} onDoubleClick={handleLike}>
        <img src={post.photoUrl} alt="Post content" className={styles.photo} />
      </div>

      {/* Interaction Bar */}
      <div className={styles.actionsBar}>
        <div className={styles.leftActions}>
          <button 
            className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button 
            className={styles.actionBtn}
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle size={20} />
          </button>
          <button className={styles.actionBtn} onClick={handleShare}>
            <Send size={20} />
          </button>
          {shareStatus && <span className={styles.shareAlert}>{shareStatus}</span>}
        </div>
        <button 
          className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.postContent}>
        <div className={styles.likesCount}>
          {likesCount.toLocaleString()} likes
        </div>
        <div className={styles.captionRow}>
          <span className={styles.captionUsername}>{post.username}</span>
          <span className={styles.captionText}>{post.caption}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        {comments.length > 0 && !showComments && (
          <button 
            className={styles.viewCommentsBtn}
            onClick={() => setShowComments(true)}
          >
            View all {comments.length} comments
          </button>
        )}

        {/* Dynamic Comments List */}
        {showComments && (
          <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
              {comments.map((comment, index) => (
                <div key={index} className={styles.commentItem}>
                  <span className={styles.commentUsername}>{comment.username}</span>
                  <span className={styles.commentText}>{comment.text}</span>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleAddComment} className={styles.commentForm}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={styles.commentInput}
              />
              <button 
                type="submit" 
                className={styles.commentSubmitBtn}
                disabled={!newComment.trim()}
              >
                Post
              </button>
            </form>
          </div>
        )}
        
        <div className={styles.postTime}>{post.timeAgo}</div>
      </div>
    </article>
  );
};

export default PostCard;
