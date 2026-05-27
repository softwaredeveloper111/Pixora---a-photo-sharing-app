import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Image, Smile, Phone, Video, Info } from 'lucide-react';
import styles from './MessagesPage.module.css';

const MessagesPage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Mock chats database
  const [conversations, setConversations] = useState([
    {
      id: 1,
      username: 'rauchg',
      fullName: 'Guillermo Rauch',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&fit=crop&q=80',
      lastMessage: 'Let’s publish the design system updates tonight.',
      time: '12m ago',
      online: true,
      messages: [
        { id: 1, sender: 'them', text: 'Hey, did you see the new home feed designs?', time: '10:30 AM' },
        { id: 2, sender: 'you', text: 'Yes, looking extremely clean. The 1px borders work great.', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'Exactly, minimal is the way. Let’s publish the design system updates tonight.', time: '10:35 AM' }
      ]
    },
    {
      id: 2,
      username: 'leeerob',
      fullName: 'Lee Robinson',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=80&fit=crop&q=80',
      lastMessage: 'The routing looks good. I will merge it.',
      time: '1h ago',
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'How is the React Router v7 integration going?', time: 'Yesterday' },
        { id: 2, sender: 'you', text: 'Almost complete. Just working on the lazy layouts.', time: 'Yesterday' },
        { id: 3, sender: 'them', text: 'The routing looks good. I will merge it.', time: '9:15 AM' }
      ]
    },
    {
      id: 3,
      username: 'linear_app',
      fullName: 'Linear App',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&q=80',
      lastMessage: 'Thanks for the bug report on cycles view!',
      time: 'Yesterday',
      online: true,
      messages: [
        { id: 1, sender: 'you', text: 'Spotted a small rendering glitch in the cycle progress bar on mobile.', time: 'Yesterday' },
        { id: 2, sender: 'them', text: 'Thanks for the bug report on cycles view! Fixing it in the next patch.', time: 'Yesterday' }
      ]
    }
  ]);

  // Find the selected conversation
  const activeChat = conversations.find(c => c.id === activeChatId);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChatId) return;

    const newMsg = {
      id: Date.now(),
      sender: 'you',
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => 
      prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: newMsg.text,
            time: 'Just now',
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      })
    );

    setMessageText('');
  };

  return (
    <div className={styles.messagesWrapper}>
      {/* Left Chat List Panel */}
      <div className={`${styles.conversationsPanel} ${activeChatId !== null ? styles.conversationsHiddenMobile : ''}`}>
        <header className={styles.panelHeader}>
          <h2>Messages</h2>
        </header>
        
        <div className={styles.chatList}>
          {conversations.map((chat) => (
            <div 
              key={chat.id} 
              className={`${styles.chatItem} ${chat.id === activeChatId ? styles.activeChatItem : ''}`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <div className={styles.avatarWrapper}>
                <img src={chat.avatar} alt={chat.username} className={styles.chatAvatar} />
                {chat.online && <span className={styles.onlineBadge}></span>}
              </div>
              <div className={styles.chatDetails}>
                <div className={styles.chatHeaderRow}>
                  <span className={styles.chatUsername}>{chat.username}</span>
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>
                <p className={styles.chatPreview}>{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Thread Panel */}
      <div className={`${styles.chatThreadPanel} ${activeChatId === null ? styles.threadHiddenMobile : ''}`}>
        {activeChat ? (
          <div className={styles.threadContainer}>
            {/* Thread Header */}
            <header className={styles.threadHeader}>
              <div className={styles.threadHeaderLeft}>
                {/* Back Button for Mobile View */}
                <button className={styles.backBtn} onClick={() => setActiveChatId(null)}>
                  <ChevronLeft size={20} />
                </button>
                
                <img src={activeChat.avatar} alt={activeChat.username} className={styles.headerAvatar} />
                <div>
                  <div className={styles.headerUsername}>{activeChat.username}</div>
                  <div className={styles.headerStatus}>{activeChat.online ? 'Online' : 'Offline'}</div>
                </div>
              </div>
              <div className={styles.threadHeaderActions}>
                <button className={styles.headerActionBtn} onClick={() => alert('Call feature (demo)')}><Phone size={18} /></button>
                <button className={styles.headerActionBtn} onClick={() => alert('Video feature (demo)')}><Video size={18} /></button>
                <button className={styles.headerActionBtn} onClick={() => alert('Info panel (demo)')}><Info size={18} /></button>
              </div>
            </header>

            {/* Bubble Messages Stream */}
            <div className={styles.messagesStream}>
              {activeChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`${styles.messageRow} ${msg.sender === 'you' ? styles.messageRowSent : styles.messageRowReceived}`}
                >
                  <div className={styles.messageBubble}>
                    <p className={styles.messageText}>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Bottom Form */}
            <form onSubmit={handleSendMessage} className={styles.messageInputForm}>
              <div className={styles.inputControls}>
                <button type="button" className={styles.inputActionBtn} onClick={() => alert('Emoji selection (demo)')}>
                  <Smile size={20} />
                </button>
                <button type="button" className={styles.inputActionBtn} onClick={() => alert('File upload (demo)')}>
                  <Image size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder={`Message @${activeChat.username}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className={styles.messageField}
              />
              <button 
                type="submit" 
                className={styles.sendBtn}
                disabled={!messageText.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.emptyThread}>
            <div className={styles.emptyThreadIcon}>
              <Send size={32} />
            </div>
            <h3>Your Messages</h3>
            <p>Select a conversation from the list to start messaging or share a photo.</p>
            <button className={styles.startChatBtn} onClick={() => setActiveChatId(1)}>
              Start Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
