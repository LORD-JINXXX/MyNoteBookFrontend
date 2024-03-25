import style from './styles.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ApiUser from '../../../api/userApi/ApiUser';
import { createNote } from "../../../redux/actionCreator/folderActionCreator";
import base_url from '../../../urls';


const CreateNote = ({ toggleNoteModal }) => {

    const userId = localStorage.getItem('userId');

    const [userInfo, setUserInfo] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            try {
                const url = `${base_url}/api/user`;
                const response = await ApiUser.get(url);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

        }

        getUserData();
    }, [])

    const [noteName, setNoteName] = useState("");
    const [extension, setExtension] = useState("docx");
    const [success, setSuccess] = useState(false);
    const noteNameWithExtension = `${noteName}.${extension}`;

    useEffect(() => {
        if (success) {
            setNoteName("");
            setSuccess(false);
            toggleNoteModal(false);
        }
    }, [success, toggleNoteModal])

    const { userNotes, currentFolder, currentFolderData } = useSelector((state) => ({
        userNotes: state.folderReducer.userNotes,
        currentFolder: state.folderReducer.currentFolder,
        currentFolderData: state.folderReducer.userFolders.find((folder) => folder.folderId === state.folderReducer.currentFolder),
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteName) {
            if (noteName.length > 3) {
                if (!checkNoteAlreadyPresent(noteNameWithExtension)) {

                    const data = {
                        createdAt: new Date(),
                        name: noteNameWithExtension,
                        userId: userId,
                        createdBy: userInfo.firstName,
                        path:
                            currentFolder === "root"
                                ? []
                                : [...currentFolderData?.data.path, currentFolder],
                        parent: currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: extension,
                        title: 'Title',
                        content: 'Content',
                    };

                    dispatch(createNote(data, setSuccess));
                    toast.success('Note created successfully!', {
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
            <div onClick={toggleNoteModal} className={style.overlay}></div>
            <div className={style.modalContent}>
                <div className={style.header}>
                    <span className={style.name}>
                        <h4>Create New Note</h4>
                    </span>
                    <span className={style.close}>
                        <svg onClick={() => toggleNoteModal(false)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                    </span>
                </div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <span className={style.input}>
                        <input
                            type="text"
                            id='noteName'
                            placeholder='Enter note name'
                            value={noteName}
                            onChange={(e) => setNoteName(e.target.value)} />
                    </span>
                    <span className={style.extension}>
                        <h3>Extension:</h3>
                        <select className={style.select} value={extension} onChange={e => setExtension(e.target.value)}>
                            <option className={style.option} value="docx">docx</option>
                            <option className={style.option} value="pdf">pdf</option>
                        </select>
                    </span>
                    <span className={style.btn}>
                        <button type='submit'>Submit</button>
                    </span>
                </form>

            </div>
        </div>
    )
}

export default CreateNote;
