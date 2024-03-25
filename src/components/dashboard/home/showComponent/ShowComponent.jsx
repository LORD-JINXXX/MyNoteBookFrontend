import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import { useDispatch } from 'react-redux';
import { changeFolder } from '../../../../redux/actionCreator/folderActionCreator';
import { useState } from 'react';
import FolderMenu from '../../../filefolder/componentMenu/FolderMenu';



const ShowComponent = ({ title, items }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDoubleClick = (folderId) => {
        dispatch(changeFolder(folderId));
        navigate(`/dashboard/folder/${folderId}`);

    }

    const [openFolderId, setOpenFolderId] = useState(null);


    const handleTripleDotClick = (folderId) => {
        setOpenFolderId((prevFolderId) => (prevFolderId === folderId ? null : folderId));
    };

    const closeMenu = () => {
        setOpenFolderId(null);
    };


    return (
        <div className={style.main}>
            <span className={style.title}>
                <h4>{title}</h4>
            </span>
            <span className={style.itemsContainer}>
                {items.length > 0 ?
                    (
                        <span className={style.items}>
                            {items.map((item, index) => {
                                return (

                                    <span
                                        className={style.item}
                                        key={index * 55}
                                        onDoubleClick={() => handleDoubleClick(item.folderId)}
                                    >
                                        <span className={style.tripleDotContainer}>
                                            <span className={style.tripleDot}>
                                                <svg
                                                    className={style.ellipsisMenu}
                                                    onClick={() => handleTripleDotClick(item.folderId)}
                                                    xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                                            </span>

                                            {openFolderId === item.folderId && <FolderMenu folderId={item.folderId} onClose={closeMenu} />}
                                        </span>
                                        <span className={style.svg}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" /></svg>
                                        </span>
                                        <h4 className={style.name}>
                                            {item.data.name}
                                        </h4>

                                    </span>
                                )

                            })}
                        </span>

                    ) :
                    (<span className={style.empty}><h3>Nothing to preview</h3></span>)}

            </span>

        </div>
    )
}

export default ShowComponent;
