import NoteMenu from '../../../filefolder/noteMenu/noteMenu';
import Note from '../../../note/Note';
import style from './styles.module.css';
import { useState } from 'react';


const ShowNoteComponent = ({ title, items}) => {


    const handleDoubleClick = (noteId) => {
        setOpenNoteId(noteId)
    }

    const [openNoteId, setOpenNoteId] = useState(null);


    const closeNote = () => {
        setOpenNoteId(null);
    };

    const [openNoteMenu, setOpenNoteMenu] = useState(null);
    const handleTripleDotClick = (noteId) => {
        setOpenNoteMenu((prevNoteId) => (prevNoteId === noteId ? null : noteId));
    };

    const closeNoteMenu = () => {
        setOpenNoteMenu(null);
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
                                        onDoubleClick={() => handleDoubleClick(item.noteId)}
                                    >
                                        <span className={style.tripleDotContainer}>
                                            <span className={style.tripleDot}>
                                                <svg
                                                    className={style.ellipsisMenu}
                                                    onClick={() => handleTripleDotClick(item.noteId)}
                                                    xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                                            </span>
                                            {openNoteMenu === item.noteId && <NoteMenu noteId={item.noteId} onClose={closeNoteMenu}/>}
                                        </span>
                                        <span className={style.svg}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" /></svg>
                                        </span>
                                        <h4 className={style.name}>
                                            {item.data.name}
                                        </h4>
                                        {openNoteId === item.noteId && <Note noteId={item.noteId} onClose={closeNote}/>}
                                        

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

export default ShowNoteComponent;
