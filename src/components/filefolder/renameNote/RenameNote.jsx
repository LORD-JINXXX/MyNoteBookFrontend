import style from './styles.module.css';
import { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renameNote } from '../../../redux/actionCreator/folderActionCreator';


const RenameNote = ({ toggleRename, noteId }) => {
    const [extension, setExtension] = useState("docx");
    const [noteName, setNoteName] = useState("");
    const noteNameWithExtension = `${noteName}.${extension}`;

    const { userNotes, currentFolder } = useSelector((state) => ({
        userNotes: state.folderReducer.userNotes,
        currentFolder: state.folderReducer.currentFolder,
    }),
        shallowEqual
    );

    const checkNoteAlreadyPresent = (name) => {
        const notePresent = userNotes
            .filter((note) => note.data.parent === currentFolder)
            .find((note) => note.data.name === name);
        if (notePresent !== undefined) {
            return true;
        } else {
            return false;
        }

    };

    const dispatch = useDispatch();

    const handleRenameNote = (e) => {
        e.preventDefault();
        if (noteName) {
            if (noteName.length > 3) {
                if (!checkNoteAlreadyPresent(noteNameWithExtension)) {

                    const data = {
                        name: noteNameWithExtension,                        
                    };

                    dispatch(renameNote(noteId,data));
                    toast.success('Note renamed successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        theme: "colored",
                    });
                } else {
                    toast.warn('Note already present by same name!', {
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
                toast.warn('Note name must be more than 3 characters', {
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
            toast.warn('Note name can not be empty', {
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
                    <h3>Rename Note</h3>
                </div>
                <div className={style.modalContentInput}>
                    <input
                        className={style.input}
                        type="text"
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                    />
                </div>
                <div className={style.modalContentExtension}>
                    <h3>Extension:</h3>
                    <select className={style.select} value={extension} onChange={e => setExtension(e.target.value)}>
                        <option className={style.option} value="docx">docx</option>
                        <option className={style.option} value="pdf">pdf</option>
                    </select>
                </div>
                <div className={style.modalContentBtn}>
                    <button className={style.no} onClick={() => toggleRename(false)}>No</button>
                    <button className={style.yes} onClick={handleRenameNote}>Rename Note</button>
                </div>
            </div>
        </div>
    )
}

export default RenameNote;
