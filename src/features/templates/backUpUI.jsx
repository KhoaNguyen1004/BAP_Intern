import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function BackUpUI() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={2}>Page Maintenance</Title>
        <Paragraph>
          We are currently performing maintenance. Please check back later.
        </Paragraph>
        <Paragraph>
          For urgent inquiries, contact <a href="mailto:support@example.com">support@example.com</a>.
        </Paragraph>
      </Content>
    </Layout>
  );
};

export default BackUpUI;