import './Chatbox.css';
import { initializeApp } from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, orderBy, limit, setDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBoydp1xb0ANGxzEvKcKFGtfvKrJCb1Y_U",
  authDomain: "test-df021.firebaseapp.com",
  projectId: "test-df021",
  storageBucket: "test-df021.appspot.com",
  messagingSenderId: "158215257419",
  appId: "1:158215257419:web:db2249ea0e25accf68bcce",
  measurementId: "G-43XHKG142E"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function ChatBox() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat</h1>
      </header>
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const messagesEndRef = useRef(null);
  const [sending, setsending] = useState('');


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const sendMessageAsync = async () => {
      if (sending) {
        try {
          setFormValue('');
          const userJson = localStorage.getItem('user');
          const user = JSON.parse(userJson);
          const username = user.username;
          const messageId = Date.now().toString();
          const messageRef = doc(messagesRef, messageId);
          
          await setDoc(messageRef, {
            id: messageId,
            text: sending,
            createdAt: serverTimestamp(),
            username,
          });

          setsending(null);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    };

    sendMessageAsync();
  }, [sending]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.trim() === '') {
      return;
    }
    setsending(formValue);
  };

  const reversedMessages = messages?.slice().reverse();

  return (
    <div>
      <div>
        {reversedMessages && reversedMessages.map(msg =>
          <ChatMessage
            key={msg.id}
            text={msg.text}
            username={msg.username}
            id={msg.id}
          />)}
      </div>
      <div className='chat-form'>
        <form onSubmit={sendMessage} ref={messagesEndRef} >
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say something nice" />
          <button type="submit" disabled={formValue.trim() === ''}>Send</button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ text, username, id }) {
  const deleteMessage = async (id) => {
    const messageDoc = doc(firestore, 'messages', id.toString());
    try {
      await deleteDoc(messageDoc);
      console.log('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };

  const userJson = localStorage.getItem('user');
  const user = JSON.parse(userJson);
  const messageClass = username === user?.username ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <div className={`message ${messageClass}`}>{username}</div>
        <p className={`chat ${messageClass}`}>{text}</p>
        {user?.role === 'super-admin' && (
          <button type="button" onClick={() => deleteMessage(id)}>Delete</button>
        )}
      </div>
    </>
  );
}

export default ChatBox;
