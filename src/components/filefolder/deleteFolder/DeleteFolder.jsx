import style from './styles.module.css';
import { useDispatch } from 'react-redux';
import { deleteFolderRequest, deleteNote } from '../../../redux/actionCreator/folderActionCreator';
import fire from '../../../config/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, shallowEqual } from 'react-redux';



const DeleteFolder = ({ toggleDelete, folderId }) => {

    const dispatch = useDispatch();

    const deleteNotesFromFolder = async (folderId) => {
        const notesToDelete = fire.firestore().collection("notes").where("parent", "==", folderId).get();
        if (notesToDelete) {
            (await notesToDelete).docs.map((note) => {
                const noteId = note.id;
                return dispatch(deleteNote(noteId));
            })
        }
    }

    const deleteFolderRecursive = async (folderId) => {
        try {
            const folderToDelete = fire.firestore().collection("folders").doc(folderId);
            const subFoldersToDelete = fire.firestore().collection("folders").where("parent", "==", folderId).get();

            if (subFoldersToDelete) {
                (await subFoldersToDelete).docs.map((folder) => {
                    const subFolderId = folder.id;
                    deleteNotesFromFolder(subFolderId);
                    deleteFolderRecursive(subFolderId);
                    return fire.firestore().collection("folders").doc(subFolderId).delete();
                });
                await deleteNotesFromFolder(folderId);
                await folderToDelete.delete();
            } else {
                await folderToDelete.delete();
            }

        } catch (error) {
            console.error(error);
        }

    }


    const handleDelete = async (folderId) => {
        try {
            dispatch(deleteFolderRequest(folderId));
            await deleteFolderRecursive(folderId);
            toggleDelete(false);
            toast.success('Folder and its sub folders deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });

        } catch (error) {
            toast.error('Failed to delete the folder', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
        }

    }

    const { currentFolder } = useSelector(
        (state) => ({
            currentFolder: state.folderReducer.userFolders.find((folder) => folder.folderId === folderId),
        }),
        shallowEqual
    );


    return (
        <div className={style.modal}>
            <div className={style.overlay} onClick={toggleDelete}></div>
            <div className={style.modalContent}>
                <div className={style.modalContentTitle}>
                    <h3>Delete Folder</h3>
                </div>
                <div className={style.modalContentPara}>
                    <p>Do you want to delete {currentFolder.data.name} and all its sub folders?</p>
                </div>
                <div className={style.modalContentBtn}>
                    <button className={style.no} onClick={() => toggleDelete(false)}>No</button>
                    <button className={style.yes} onClick={() => handleDelete(folderId)}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteFolder;
