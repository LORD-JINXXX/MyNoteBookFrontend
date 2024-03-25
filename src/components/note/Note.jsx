import style from './styles.module.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editNote } from '../../redux/actionCreator/folderActionCreator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Note = ({ noteId, onClose }) => {


    const { currentNoteData } = useSelector((state) => ({
        currentNoteData: state.folderReducer.userNotes.find((note) => note.noteId === noteId),
    }),
        shallowEqual
    );

    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [title, setTitle] = useState(`${currentNoteData.data.title}`);

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(`${currentNoteData.data.content}`);

    const handleEditClick = () => {
        setIsTitleEditing(true)
        setIsEditing(true);
    };

    const dispatch = useDispatch();

    const handleSaveClick = (e) => {
        e.preventDefault();
        try {
            const data = {
                title: title,
                content: content,
            }
            dispatch(editNote(noteId, data));

            toast.success('Title and content has been saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
            setIsEditing(false);
            setIsTitleEditing(false);

        } catch (error) {
            toast.error('Failed to save the note', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
        }

    }

    const handleUpperCase = () => {
        let newContent = content.toUpperCase();
        setContent(newContent);
    };

    const handleLowerCase = () => {
        let newContent = content.toLowerCase();
        setContent(newContent);
    };

    const handleCopyContent = () => {
        let myContent = document.getElementById("content");
        myContent.select();
        navigator.clipboard.writeText(myContent.value);
    };

    const handleExtraSpaces = () => {
        let newContent = content.split(/[ ] +/);
        setContent(newContent.join(" "));
    };


    return (

        <div className={style.modal}>
            <div className={style.overlay}></div>
            <div className={style.modalContent}>
                <div className={style.modalContentTitle}>
                    <div className={style.title}>
                        {isTitleEditing ?
                            <input type='text' value={title} onChange={(e => setTitle(e.target.value))} />
                            :
                            <h2>{currentNoteData.data.title}</h2>
                        }
                    </div>
                    <div className={style.btn}>
                        <button className={style.edit} onClick={handleEditClick}>Edit</button>
                        {
                            isEditing ?
                                (<button className={style.save} onClick={handleSaveClick}>Save</button>) :
                                (<button className={style.saveDisable} onClick={handleSaveClick} disabled>Save</button>)

                        }
                        <button className={style.close} onClick={onClose}>Close</button>
                    </div>
                </div>
                <div className={style.Container}>
                    <div className={style.leftContainer}>
                        {isEditing ? (
                            <div className={style.content}>
                                <textarea value={content} onChange={(e => setContent(e.target.value))} id='content' />
                            </div>
                        ) : (
                            <div className={style.contentPreview}>
                                <p>{currentNoteData.data.content}</p>
                            </div>
                        )}
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.btnConatinerOne}>
                            {
                                isEditing ?
                                    (
                                        <button className={style.rightContainerBTN} onClick={handleUpperCase}>Covert to UpperCase</button>
                                    ) :
                                    (
                                        <button className={style.rightContainerBTNDisable} onClick={handleUpperCase} disabled>Covert to UpperCase</button>
                                    )
                            }

                            {
                                isEditing ?
                                    (
                                        <button className={style.rightContainerBTN} onClick={handleLowerCase}>Covert to LowerCase</button>
                                    ) :
                                    (
                                        <button className={style.rightContainerBTNDisable} onClick={handleLowerCase} disabled>Covert to LowerCase</button>
                                    )
                            }
                        </div>
                        <div className={style.btnConatinerTwo}>
                            {
                                isEditing ?
                                    (
                                        <button className={style.rightContainerBTN} onClick={handleCopyContent}>Copy Content</button>
                                    ) :
                                    (
                                        <button className={style.rightContainerBTNDisable} onClick={handleCopyContent} disabled>Copy Content</button>
                                    )
                            }

                            {
                                isEditing ?
                                    (
                                        <button className={style.rightContainerBTN} onClick={handleExtraSpaces}>Remove Spaces</button>
                                    ) :
                                    (
                                        <button className={style.rightContainerBTNDisable} onClick={handleExtraSpaces} disabled>Remove Spaces</button>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}


export default Note;
