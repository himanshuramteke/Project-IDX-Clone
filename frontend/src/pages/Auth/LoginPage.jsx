import { Button, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: '#0f1624',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif"
    }}>
      <Header style={{ 
        background: 'transparent', 
        padding: '0 24px',
        height: 80,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/">
          <Space align="center">
            <Text strong style={{ 
              color: '#ffffff', 
              fontSize: 22,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600
            }}>
              CodeSandbox
            </Text>
          </Space>
        </Link>
      </Header>

      <Content style={{ padding: '0 24px' }}>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ 
            minHeight: 'calc(100vh - 160px)',
            maxWidth: 500,
            margin: '0 auto'
          }}
        >
          <Title 
            level={2} 
            style={{ 
              color: '#ffffff', 
              marginBottom: 24,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Welcome back
          </Title>

          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: '100%' }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: '#8c8c8c' }} />} 
                placeholder="Email" 
                size="large"
                style={{
                  background: '#ffffff',
                  borderColor: '#303030',
                  color: '#000000',
                  height: 48
                }}
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: '#8c8c8c' }} />}
                type="password"
                placeholder="Password"
                size="large"
                style={{
                  background: '#ffffff',
                  borderColor: '#303030',
                  color: '#000000',
                  height: 48
                }}
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between">
                
                <a style={{ color: '#1890ff' }} href="">Forgot password?</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  height: 48,
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  borderRadius: 8
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ color: '#8c8c8c', marginTop: 24 }}>
             {`Don't have an account? `}
            <Link to="/signup" style={{ color: '#1890ff' }}>Sign up</Link>
          </Text>
        </Flex>
      </Content>  

      <Footer style={{ 
        textAlign: 'center', 
        background: 'transparent', 
        color: 'white',
        borderTop: '1px solid #303030', 
        padding: '24px 0',
        fontFamily: "'Inter', sans-serif"
      }}>
        <Text style={{ color: '#ffffff'}}>CodeSandbox ©{new Date().getFullYear()}</Text>
      </Footer>
    </Layout>
  );
};
