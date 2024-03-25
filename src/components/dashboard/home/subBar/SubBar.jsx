import style from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { changeFolder } from '../../../../redux/actionCreator/folderActionCreator';


const SubBar = ({ toggleModal, toggleNoteModal }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const { currentFolder, currentFolderData, userFolders } = useSelector((state) => ({
        userFolders: state.folderReducer.userFolders,
        currentFolder: state.folderReducer.currentFolder,
        currentFolderData: state.folderReducer.userFolders.find((folder) => folder.folderId === state.folderReducer.currentFolder),
    }),
        shallowEqual
    );


    const handleNavigate = (link, id) => {
        navigate(link);

        dispatch(changeFolder(id));
    }

    return (
        <div className={style.bar}>
            <div className={style.barLeft}>
                <span className={style.path}>
                    {currentFolder !== 'root' ?
                        (
                            <ul className={style.breadcrumb}>
                                <button
                                    className={style.breadcrumbItem}
                                    onClick={() => handleNavigate('/dashboard', 'root')}>
                                    Root
                                </button>
                                {currentFolderData?.data.path.map((id) => (
                                    <button
                                        className={style.breadcrumbItem}
                                        onClick={() =>
                                            handleNavigate(
                                                `/dashboard/folder/${userFolders.find((folder)=>folder.folderId === id).folderId}`,
                                                userFolders.find((folder)=>folder.folderId === id).folderId
                                            )}>
                                        {userFolders.find((folder)=>folder.folderId === id)?.data.name}
                                    </button>
                                ))}
                                <li className={style.breadcrumbItem}>
                                    {currentFolderData?.data.name}
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className={style.breadcrumb}>
                                <li className={style.breadcrumbItem}>Root</li>
                            </ul>
                        )}

                </span>

            </div>
            <div className={style.barRight}>
                <button className={style.btn} onClick={() => toggleModal(true)}>
                    <span className={style.svg}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </span>
                    <span className={style.name}>New Folder</span>
                </button>

                <button className={style.btn} onClick={() => toggleNoteModal(true)}>
                    <span className={style.svg}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </span>
                    <span className={style.name}>New Note</span>
                </button>

            </div>

        </div>
    )
}

export default SubBar;
