import SubBar from '../../dashboard/home/subBar/SubBar';
import style from './styles.module.css';
import { useParams, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from 'react-redux';
import CreateFolder from '../createFolder/CreateFolder';
import { useState, useEffect } from 'react';
import ShowComponent from '../../dashboard/home/showComponent/ShowComponent';
import { useDispatch } from 'react-redux';
import { changeFolder, getFolders, getNotes } from '../../../redux/actionCreator/folderActionCreator';
import ShowNoteComponent from '../../dashboard/home/showNote/ShowNoteComponent';
import CreateNote from '../createFile/CreateNote';


const FolderComponent = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const param = useParams();
    const FolderId = param.folderId;

    const userId = localStorage.getItem('userId');

    const { folderId } = useParams();
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const [noteModal, setNoteModal] = useState(false);

    const toggleNoteModal = () => {
        setNoteModal(!noteModal);
    };

    const { isLoading, childFolders, userNotes } = useSelector((state) => ({
        isLoading: state.folderReducer.isLoading,
        childFolders: state.folderReducer.userFolders.filter((folder) => folder.data.parent === folderId),
        userNotes: state.folderReducer.userNotes.filter((note) => note.data.parent === folderId),
    }),
        shallowEqual
    );


    useEffect(() => {
        if (isLoading && userId) {
            dispatch(getFolders(userId));
            dispatch(getNotes(userId));
        }
        if (location.pathname === `/dashboard/folder/${FolderId}`) {
            dispatch(changeFolder(FolderId));
        }


    }, [isLoading, userId, dispatch, location, FolderId])


    return (
        <div className={style.main}>
            <div className={style.bar}>
                {modal &&
                    <CreateFolder toggleModal={toggleModal} />
                }
                {noteModal &&
                    <CreateNote toggleNoteModal={toggleNoteModal} />
                }

                <SubBar toggleModal={toggleModal} toggleNoteModal={toggleNoteModal} />
            </div>

            <div className={style.showItem}>
                {
                    isLoading ?
                        (<div className={style.showItemContent}>
                            <h1>Loading...</h1>
                        </div>) :
                        (<> {
                            childFolders.length > 0 || userNotes.length > 0 ?
                                <div className={style.showItemContent}>
                                    <ShowComponent title={"Created Folders"} items={childFolders} />
                                    <ShowNoteComponent title={"Created Notes"} items={userNotes}  />
                                </div>
                                :
                                <div className={style.showItemContent}>
                                    <h3>Folder is empty</h3>
                                </div>
                        }

                        </>

                        )}

            </div>
        </div>
    )
}

export default FolderComponent;
