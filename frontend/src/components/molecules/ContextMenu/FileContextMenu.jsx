import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import "./FileContextMenu.css";

export const FileContextMenu = ({
    x,
    y,
    path

}) => {

    const { setIsOpen } = useFileContextMenuStore();
    const { editorSocket } = useEditorSocketStore();

    const [isRenameModalOpen, setRenameModalOpen] = useState(false);
    const [isCreateFileModalOpen, setCreateFileModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const handleSuccess = (payload) => {
            console.log(payload);
        };
        ["renameFileSuccess", "createFileSuccess", "createFolderSuccess", "deleteFolderSuccess"].forEach(event => {
            editorSocket.on(event, handleSuccess);
        });
        return () => {
            ["renameFileSuccess", "createFileSuccess", "createFolderSuccess", "deleteFolderSuccess"].forEach(event => {
                editorSocket.off(event, handleSuccess);
            });
        };
    }, [editorSocket]);

    function handleDeleteFile(e) {
        e.preventDefault();
        console.log("Deleting file at", path);
        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        });
    };

    function handleDeleteFolder(e) {
        e.preventDefault();
        editorSocket.emit("deleteFile", { pathToFileOrFolder: path });
        setIsOpen(false);
    }

    const handleRenameClick = (e) => { e.preventDefault(); setRenameModalOpen(true); };
    const handleCreateFileClick = (e) => { e.preventDefault(); setCreateFileModalOpen(true); };
    const handleCreateFolderClick = (e) => { e.preventDefault(); setCreateFolderModalOpen(true); };


    const submitRename = (e) => {
        e.preventDefault();
        const parts = path.split(/\\|\//);
        parts[parts.length - 1] = newName;
        editorSocket.emit("renameFile", { oldPath: path, newPath: parts.join("/") });
        setRenameModalOpen(false);
        setIsOpen(false);
    };
    const submitCreateFile = (e) => {
        e.preventDefault();
        const folder = path.endsWith("/") ? path.slice(0, -1) : path;
        const newPath = `${folder}/${newName}`;
        editorSocket.emit("createFile", { pathToFileOrFolder: newPath });
        setCreateFileModalOpen(false);
        setIsOpen(false);
    };
    const submitCreateFolder = (e) => {
        e.preventDefault();
        const folder = path.endsWith("/") ? path.slice(0, -1) : path;
        const newPath = `${folder}/${newName}`;
        editorSocket.emit("createFolder", { pathToFileOrFolder: newPath });
        setCreateFolderModalOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <div
                onMouseLeave={() => {
                    console.log("Mouse Left");
                    setIsOpen(false);
                }}
                className="fileContextOptionsWrapper"
                style={{
                    left: x,
                    top: y,
                }}
            >
                <button className="fileContextButton" onClick={handleCreateFileClick}>
                    Create File
                </button>
                <button className="fileContextButton" onClick={handleCreateFolderClick}>
                    Create Folder
                </button>
                <button className="fileContextButton" onClick={handleDeleteFile}>
                    Delete File
                </button>
                <button className="fileContextButton" onClick={handleDeleteFolder}>
                    Delete Folder
                </button>
                <button className="fileContextButton" onClick={handleRenameClick}>
                    Rename File/Folder
                </button>

            </div>

            {/* Rename Modal */}
            {isRenameModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>Rename File</h3>
                        <form onSubmit={submitRename}>
                            <input
                                type="text"
                                placeholder="New file name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                            />
                            <div className="modalButtons">
                                <button type="submit">Rename</button>
                                <button type="button" onClick={() => setRenameModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Create File Modal */}
            {isCreateFileModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>Create File</h3>
                        <form onSubmit={submitCreateFile}>
                            <input
                                type="text"
                                placeholder="File name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                            />
                            <div className="modalButtons">
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => setCreateFileModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Create Folder Modal */}
            {isCreateFolderModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>Create Folder</h3>
                        <form onSubmit={submitCreateFolder}>
                            <input
                                type="text"
                                placeholder="Folder name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                            />
                            <div className="modalButtons">
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => setCreateFolderModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}