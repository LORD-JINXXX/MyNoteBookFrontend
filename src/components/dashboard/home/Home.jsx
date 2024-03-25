import style from './styles.module.css';
import SubBar from './subBar/SubBar';
import ShowComponent from './showComponent/ShowComponent';
import { useState, useEffect } from 'react';
import CreateFolder from '../../filefolder/createFolder/CreateFolder';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeFolder, getFolders, getNotes } from '../../../redux/actionCreator/folderActionCreator';
import { useLocation } from 'react-router-dom';
import CreateNote from '../../filefolder/createFile/CreateNote';
import ShowNoteComponent from './showNote/ShowNoteComponent';


const Home = () => {

    const userId = localStorage.getItem('userId');

    const { isLoading, userFolders, userNotes } = useSelector(
        (state) => ({
            isLoading: state.folderReducer.isLoading,
            userFolders: state.folderReducer.userFolders.filter((folder) => folder.data.parent === 'root'),
            userNotes: state.folderReducer.userNotes.filter((note) => note.data.parent === 'root'),
        }),
        shallowEqual
    );



    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() => {
        if (isLoading && userId) {
            dispatch(getFolders(userId));
            dispatch(getNotes(userId));
        }

        if (location.pathname === '/dashboard') {
            dispatch(changeFolder('root'));
        }


    }, [isLoading, userId, dispatch, location])

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const [noteModal, setNoteModal] = useState(false);

    const toggleNoteModal = () => {
        setNoteModal(!noteModal);
    };




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
                        </div>)

                        :
                        (
                            <div className={style.showItemContent}>
                                <ShowComponent
                                    title={"Created Folders"}
                                    items={userFolders} />
                                    
                                <ShowNoteComponent
                                    title={"Created Notes"}
                                    items={userNotes}
                                />    
                            </div>
                        )
                }

            </div>
        </div>
    )
}

export default Home;
