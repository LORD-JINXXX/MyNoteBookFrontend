import style from './styles.module.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { renameFolder } from '../../../redux/actionCreator/folderActionCreator';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenameFolder = ({ toggleRename, folderId }) => {

    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState("");

    const { userFolders, currentFolder } = useSelector((state) => ({
        userFolders: state.folderReducer.userFolders,
        currentFolder: state.folderReducer.currentFolder,
    }),
        shallowEqual
    );

    const checkFolderAlreadyPresent = (name) => {
        const folderPresent = userFolders
            .filter((folder) => folder.data.parent === currentFolder)
            .find((folder) => folder.data.name === name);
        if (folderPresent !== undefined) {
            return true;
        } else {
            return false;
        }

    };

    const handleRenameFolder = (e) => {
        e.preventDefault();
        if (folderName) {
            if (folderName.length > 3) {
                if (!checkFolderAlreadyPresent(folderName)) {
                    const data = {
                        name: folderName,
                    };

                    dispatch(renameFolder(folderId, data));
                    toast.success('Folder name updated successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        theme: "colored",
                    });
                    setFolderName("");
                    toggleRename(false);
                } else {
                    toast.warn('Folder already present by same name!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

            } else {
                toast.warn('Folder name must be more than 3 characters', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            toast.warn('Folder name can not be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }


    }


    return (
        <div className={style.modal}>
            <div className={style.overlay} onClick={toggleRename}></div>
            <div className={style.modalContent}>
                <div className={style.modalContentTitle}>
                    <h3>Rename Folder</h3>
                </div>
                <div className={style.modalContentInput}>
                    <input
                        className={style.input}
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </div>
                <div className={style.modalContentBtn}>
                    <button className={style.no} onClick={() => toggleRename(false)}>No</button>
                    <button className={style.yes} onClick={handleRenameFolder}>Rename Folder</button>
                </div>
            </div>
        </div>
    )
}

export default RenameFolder;
