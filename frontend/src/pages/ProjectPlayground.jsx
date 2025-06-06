import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../store/terminalSocketStore";
import { Browser } from "../components/organisms/Browser/Browser";
import { Button } from "antd";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export const ProjectPlayground = () => {

    const { projectId: projectIdfromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket } = useEditorSocketStore();

    const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();

    const [ loadBrowser, setLoadBrowser ] = useState(false);

    useEffect(() => {
      if(projectIdfromUrl) {
          setProjectId(projectIdfromUrl);

          const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {

              query: {
                projectId : projectIdfromUrl
              }
          });

          try {
            const ws = new WebSocket("ws://localhost:4000/terminal?projectId="+projectIdfromUrl);
            setTerminalSocket(ws)
          } catch (error) {
            console.log("error in ws",error);
          }
          
          setEditorSocket(editorSocketConn);
      }
    },[setProjectId, projectIdfromUrl, setEditorSocket, setTerminalSocket]);

    return (
       <>
         <div style={{ display: "flex" }}>
            { projectId && (
                <div
                    style={{
                      backgroundColor: "#333254",
                      paddingRight: "10px",
                      paddingTop: "0.3vh",
                      minWidth: "250px",
                      maxWidth: "25%",
                      height: "100vh",
                      overflow: "auto"
                    }}
                >
                  <TreeStructure />
                </div>
            )}  
            <div
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <Allotment>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#282a36"
                        }}
                    >
                    <Allotment
                        vertical={true}
                    >
                        <EditorComponent />
                        {/* <Divider style={{color: 'white', backgroundColor: '#333254'}} plain>Terminal</Divider> */}
                        <BrowserTerminal />
                    </Allotment>
                        
                       
                        
                    </div>
                    <div>
                        <Button
                            onClick={() => setLoadBrowser(true)}
                        >
                            Load my browser
                        </Button>
                        { loadBrowser && projectIdfromUrl && terminalSocket && <Browser projectId={projectIdfromUrl} />}
                    </div>
                </Allotment>
            </div>
        </div>
       </>
    )
}