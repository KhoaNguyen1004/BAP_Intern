import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Layout, Dropdown, Menu } from 'antd';
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  MoreOutlined
} from '@ant-design/icons';
import './Chatbox.css';

const { Header, Content, Footer } = Layout;

function Chatbox() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const toggleChatbox = () => {
    setVisible(!visible);
  };

  const closeChatbox = () => {
    setVisible(false);
  };

  const handleDelete = (index) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
  };

  const handleSend = () => {
    if (message.trim()) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setMessages([...messages, { text: message, sentAt: formattedTime }]);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMenuClick = (index, e) => {
    if (e.key === 'delete') {
      handleDelete(index);
    }
    // Handle reply option here if needed
  };

  const messageMenu = (index) => (
    <Menu onClick={(e) => handleMenuClick(index, e)}>
      <Menu.Item key="reply">Reply</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

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
            <span>Chatbox</span>
            <div>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={closeChatbox}
              />
            </div>
          </Header>
          <Content className="chatbox-messages">
            {messages.map((item, index) => (
              <div key={index} className="chatbox-message">
                <div className="message-content">
                  <span>{item.text}</span>
                  
                </div>
                <div className="message-timestamp">
                <Dropdown
                    placement="topCenter"
                    arrow
                    overlay={messageMenu(index)}
                    trigger={['click']}
                  >
                    <Button
                      type="text"
                      icon={<MoreOutlined />}
                      className="message-more-button"
                    />
                  </Dropdown>
                  <span
                  className="message-time"
                  >{item.sentAt}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Content>
          <Footer className="chatbox-input-container">
            <Input
              className="chatbox-input"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSend}
              suffix={
                <SendOutlined
                  onClick={handleSend}
                  style={{ cursor: 'pointer' }}
                />
              }
            />
          </Footer>
        </Layout>
      )}
    </div>
  );
}

export default Chatbox;
