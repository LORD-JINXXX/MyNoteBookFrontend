import style from './styles.module.css';
import { useState } from 'react';
import DeleteNote from '../deleteNote/DeleteNote';
import RenameNote from '../renameNote/RenameNote';



const NoteMenu = ({ noteId, onClose }) => {

    const [deleteModal, setDeleteModal] = useState(false);
    const [renameModal, setRenameModal] = useState(false);

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const toggleRenameModal = () => {
        setRenameModal(!renameModal);
    };

    return (
        <div className={style.mainMenu}>
            {deleteModal &&
                <DeleteNote
                    toggleDelete={toggleDeleteModal}
                    noteId={noteId} />}

            {renameModal &&
                <RenameNote
                    toggleRename={toggleRenameModal}
                    noteId={noteId} />}
                    
            <div className={style.menuItems}>
                <span
                    className={style.menuItem}
                    onClick={toggleRenameModal}
                >
                    Rename
                </span>

                <span
                    className={style.menuItem}
                    onClick={toggleDeleteModal}
                >
                    Delete
                </span>
            </div>
            <div className={style.menuClose}>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>
                </button>
            </div>
        </div>
    )
}

export default NoteMenu;
