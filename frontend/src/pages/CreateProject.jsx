import { Button, Flex, Layout, Space, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const CreateProject = () => {
    const { createProjectMutation } = useCreateProject();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    async function handleCreateProject() {
        console.log("Going to trigger the api");
        setIsCreating(true);
        
        try {
            // Show loader for 3 seconds before creating the project
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const response = await createProjectMutation();
            console.log("Now we should redirect to the editor");
            navigate(`/project/${response.data}`);
        } catch (error) {
            console.log("Error creating project", error);
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <Layout style={{ 
            minHeight: "100vh", 
            background: "#0f1624",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif"
        }}>
    
            <Header style={{ 
                background: "transparent", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "0 24px",
                height: 80
            }}>
                <Space align="center">
                   
                    <Text strong style={{ 
                        color: "#fff", 
                        fontSize: 22,
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600
                    }}>
                        CodeSandbox
                    </Text>
                </Space>
                <Space>
                    <Button 
                      ghost 
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      onClick={() => navigate("/login")}
                    >Login</Button>
                    <Button 
                      type="primary" 
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      onClick={() => navigate("/signup")}
                      >Sign Up</Button>
                </Space>
            </Header>

            <Content style={{ padding: "0 24px" }}>
                <Flex 
                    vertical 
                    justify="center" 
                    align="center" 
                    style={{ 
                        minHeight: "calc(100vh - 160px)",
                        textAlign: "center",
                        maxWidth: 800,
                        margin: "0 auto"
                    }}
                >
                    <Title 
                        level={1} 
                        style={{ 
                            color: "#fff", 
                            marginBottom: 16,
                            fontSize: "3.5rem",
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            lineHeight: 1.2
                        }}
                    >
                        Create React Apps <br /> in Seconds
                    </Title>
                    <Text 
                        style={{ 
                            color: "#8c8c8c", 
                            marginBottom: 48,
                            fontSize: "1.25rem",
                            maxWidth: 600,
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: 1.6
                        }}
                    >
                        The fastest way to create React applications right in your browser.
                    </Text>
                    
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleCreateProject}
                        loading={isCreating}
                        style={{ 
                            height: 56, 
                            padding: "0 40px", 
                            fontSize: 18,
                            background: "#1890ff",
                            borderColor: "#1890ff",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            borderRadius: 8
                        }}
                    >
                        {isCreating ? "Creating..." : "Create Playground"}
                    </Button>
                </Flex>
            </Content>

            <Footer style={{ 
                textAlign: "center", 
                background: "transparent", 
                color: "#ffffff",
                borderTop: "1px solid #303030",
                padding: "24px 0",
                fontFamily: "'Inter', sans-serif"
            }}>
                <Text style={{ color: '#ffffff'}}>CodeSandbox ©{new Date().getFullYear()}</Text>
            </Footer>
        </Layout>
    )
}