import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEffect } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../store/terminalSocketStore";

export const ProjectPlayground = () => {

    const { projectId: projectIdfromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket, editorSocket } = useEditorSocketStore();

    const { setTerminalSocket } = useTerminalSocketStore();

    function fetchPort() {
      console.log(editorSocket);
      editorSocket.emit("getPort");
      console.log("fetching port");
    }

    useEffect(() => {
      if(projectIdfromUrl) {
          setProjectId(projectIdfromUrl);

          const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {

              query: {
                projectId : projectIdfromUrl
              }
          });
          const ws = new WebSocket("ws://localhost:3000/terminal?projectId="+projectIdfromUrl);
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
                      height: "99.7vh",
                      overflow: "auto"
                    }}
                >
                  <TreeStructure />
                </div>
            )}  
            <EditorComponent />
         </div>
         <EditorButton isActive={false}/>
         <EditorButton isActive={true}/>
         <div>
          <button onClick={fetchPort}
          >
            getport
          </button>
         </div>
         <div>
           <BrowserTerminal />
         </div>
       </>
    )
}