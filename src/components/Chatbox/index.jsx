import './Chatbox.css';
import { initializeApp } from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  setDoc,
  serverTimestamp,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { Button, Input, Layout, Dropdown } from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  angryIcon,
  careIcon,
  hahaIcon,
  likeIcon,
  loveIcon,
  sadIcon,
  wowIcon
} from '../../assets/reactions/reactions';

const { Header, Content, Footer } = Layout;

const firebaseConfig = {
  apiKey: 'AIzaSyBoydp1xb0ANGxzEvKcKFGtfvKrJCb1Y_U',
  authDomain: 'test-df021.firebaseapp.com',
  projectId: 'test-df021',
  storageBucket: 'test-df021.appspot.com',
  messagingSenderId: '158215257419',
  appId: '1:158215257419:web:db2249ea0e25accf68bcce',
  measurementId: 'G-43XHKG142E'
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function ChatBox() {
  const [visible, setVisible] = useState(false);
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(
    messagesRef,
    orderBy('createdAt', 'desc'),
    limit(25)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const messagesEndRef = useRef(null);
  const [sending, setSending] = useState('');

  const toggleChatbox = () => {
    setVisible(!visible);
  };

  const closeChatbox = () => {
    setVisible(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (visible) {
      scrollToBottom();
    }
  }, [visible]);
  useEffect(() => {
    const sendMessageAsync = async () => {
      if (sending) {
        try {
          setFormValue('');
          const userJson = sessionStorage.getItem('user');
          const user = JSON.parse(userJson);
          const username = user.username;
          const messageId = Date.now().toString();
          const messageRef = doc(messagesRef, messageId);

          await setDoc(messageRef, {
            id: messageId,
            text: sending,
            createdAt: serverTimestamp(),
            username
          });

          setSending('');
          scrollToBottom();
        } catch (error) {
          console.error('Error sending message:', error);
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
    setSending(formValue);
  };

  const reversedMessages = messages?.slice().reverse();
  useEffect(() => {
    scrollToBottom();
    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage) {
        // Handle changes in sessionStorage if needed
        console.log('SessionStorage changed:', event);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <div className="chatbox-container">
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={toggleChatbox}
        className="fixed bottom-7 right-7 z-50 shadow-lg hover:shadow-2xl !bg-primary-dominant hover:!bg-primary-dominant-dark focus:!bg-primary-dominant-light"
      />
      {visible && (
        <Layout className={`chatbox ${visible ? 'chatbox-visible' : ''}`}>
          <Header className="chatbox-header">
            <div className="chatbox-title">Chat</div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={closeChatbox}
            />
          </Header>
          <Content className="chatbox-messages">
            {reversedMessages &&
              reversedMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  text={msg.text}
                  username={msg.username}
                  createdAt={msg.createdAt}
                  id={msg.id}
                />
              ))}
            <div ref={messagesEndRef} />
          </Content>
          <Footer className="chatbox-input-container">
            <div className="chat-form">
              <form onSubmit={sendMessage}>
                <Input
                  className="chatbox-input"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="Type a message"
                  suffix={
                    <SendOutlined
                      onClick={sendMessage}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </form>
            </div>
          </Footer>
        </Layout>
      )}
    </div>
  );
}

function ChatMessage({ text, username, createdAt, id }) {
  const deleteMessage = async (id) => {
    const messageDoc = doc(firestore, 'messages', id.toString());
    try {
      await deleteDoc(messageDoc);
      console.log('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };

  const userJson = sessionStorage.getItem('user');
  const user = JSON.parse(userJson);
  const messageClass = username === user?.username ? 'sent' : 'received';

  const formattedTime = createdAt
    ? createdAt.toDate().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    : '';



  const items = [
    {
      key: 'like',
      label: <img src={likeIcon} alt="Like" className="w-6 h-6" />
    },
    {
      key: 'love',
      label: <img src={loveIcon} alt="Love" className="w-6 h-6" />
    },
    {
      key: 'haha',
      label: <img src={hahaIcon} alt="Haha" className="w-6 h-6" />
    },
    {
      key: 'wow',
      label: <img src={wowIcon} alt="Wow" className="w-6 h-6" />
    },
    {
      key: 'sad',
      label: <img src={sadIcon} alt="Sad" className="w-6 h-6" />
    },
    {
      key: 'angry',
      label: <img src={angryIcon} alt="Angry" className="w-6 h-6" />
    },
    {
      key: 'care',
      label: <img src={careIcon} alt="Care" className="w-6 h-6" />
    },
    {
      type: 'divider'
    },
    {
      key: 'more',
      label: (
        <>
          {user?.role === 'super-admin' && (
          <DeleteOutlined
            className="text-red-500 hover:text-red-700 m-2"
            onClick={() => deleteMessage(id)}
            style={{ cursor: 'pointer' }}
          />
        )}
        </>
      )
    }
  ].filter(Boolean);

  return (
    <div className={`message ${messageClass}`}>
      <div
        className={`text-xs font-medium ${messageClass === 'sent' ? 'text-right' : 'text-left'}`}
      >
        {messageClass === 'received' ? (
          <>
            {username}{' '}
            <span className="text-xs italic font-normal 	 ">
              {formattedTime}
            </span>
          </>
        ) : (
          <>
            <span className="text-xs font-thin">{formattedTime}</span>
          </>
        )}
      </div>

      <div className={`flex ${messageClass === 'sent' ? 'flex-row-reverse' : 'flex-row'} items-center mt-1`}>
      <div className="group relative max-w-[70%] break-words">
      <Dropdown
        menu={{ items }}
        trigger={['hover']}
        className="relative group"
        placement="topRight"
        overlayClassName="horizontal-dropdown"
      >
        <div className="bg-gray-200 p-2 rounded-lg">
          <span>{text}</span>
        </div>
      </Dropdown>
      </div>
      </div>
    </div>
  );
}

export default ChatBox;
