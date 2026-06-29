// src/ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';

function ChatRoom({ activeRoom, user }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const dummySpace = useRef();

  useEffect(() => {
    const messagesRef = collection(db, 'chatRooms', activeRoom.id, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
      setTimeout(() => dummySpace.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [activeRoom]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim()) return;

    const messagesRef = collection(db, 'chatRooms', activeRoom.id, 'messages');
    
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    });

    setFormValue('');
  };

  return (
    <div className="chatroom-window">
      <div className="room-header">🎨 Current Room: {activeRoom.name}</div>
      
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.uid === user.uid ? 'sent' : 'received'}`}>
            <img src={msg.photoURL || 'https://via.placeholder.com/30'} alt="Avatar" />
            <div className="message-text-group">
              <span className="user-name">{msg.displayName}</span>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={dummySpace}></div>
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;