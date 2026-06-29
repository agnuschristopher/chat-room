// src/App.js
import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ChatRoom from './ChatRoom';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="login-screen">
        <h2>👋 Welcome to Global Chat Rooms</h2>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h3>Logged in as: {user.displayName}</h3>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>
      <div className="main-layout">
        <div className="sidebar">
          <h3>Chat Rooms</h3>
          <button 
            className={`room-link ${activeRoom?.id === 'general' ? 'active' : ''}`}
            onClick={() => setActiveRoom({ id: 'general', name: 'General' })}
          >
            📢 General
          </button>
        </div>
        {activeRoom ? (
          <ChatRoom activeRoom={activeRoom} user={user} />
        ) : (
          <div className="no-room">Select the General Chat Room to start talking!</div>
        )}
      </div>
    </div>
  );
}

export default App;