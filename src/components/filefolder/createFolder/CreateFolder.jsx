import style from './styles.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ApiUser from '../../../api/userApi/ApiUser';
import { createFolder } from "../../../redux/actionCreator/folderActionCreator";
import base_url from '../../../urls';


const CreateFolder = ({ toggleModal }) => {

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

    const [folderName, setFolderName] = useState("");

    const { userFolders, currentFolder, currentFolderData } = useSelector((state) => ({
        userFolders: state.folderReducer.userFolders,
        currentFolder: state.folderReducer.currentFolder,
        currentFolderData: state.folderReducer.userFolders.find((folder) => folder.folderId === state.folderReducer.currentFolder),
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

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderName) {
            if (folderName.length > 3) {
                if (!checkFolderAlreadyPresent(folderName)) {

                    const data = {
                        createdAt: new Date(),
                        name: folderName,
                        userId: userId,
                        createdBy: userInfo.firstName,
                        path:
                            currentFolder === "root"
                                ? []
                                : [...currentFolderData?.data.path, currentFolder],
                        parent: currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                    };

                    dispatch(createFolder(data));
                    toast.success('Folder created successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        theme: "colored",
                    });
                    setFolderName("");
                    toggleModal(false);
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
            <div onClick={toggleModal} className={style.overlay}></div>
            <div className={style.modalContent}>
                <div className={style.header}>
                    <span className={style.name}>
                        <h4>Create New Folder</h4>
                    </span>
                    <span className={style.close}>
                        <svg onClick={() => toggleModal(false)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                    </span>
                </div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <span className={style.input}>
                        <input
                            type="text"
                            id='folderName'
                            placeholder='Folder Name'
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)} />
                    </span>
                    <span className={style.btn}>
                        <button type='submit'>Submit</button>
                    </span>
                </form>

            </div>
        </div>
    )
}

export default CreateFolder;
