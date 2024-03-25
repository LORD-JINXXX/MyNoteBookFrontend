import { deleteNote } from '../../../redux/actionCreator/folderActionCreator';
import style from './styles.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DeleteNote = ({ toggleDelete, noteId }) => {

    const dispatch = useDispatch();
    const handleDeleteNote = async (e) => {
        e.preventDefault();
        try {
            dispatch(deleteNote(noteId));
            toggleDelete(false);
            toast.success('Note has been deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });

        } catch (error) {
            toast.error('Failed to delete the note', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
        }

    }


    return (
        <div className={style.modal}>
            <div className={style.overlay} onClick={toggleDelete}></div>
            <div className={style.modalContent}>
                <div className={style.modalContentTitle}>
                    <h3>Delete Note</h3>
                </div>
                <div className={style.modalContentPara}>
                    <p>Do you want to delete this note?</p>
                </div>
                <div className={style.modalContentBtn}>
                    <button className={style.no} onClick={() => toggleDelete(false)}>No</button>
                    <button className={style.yes} onClick={handleDeleteNote}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteNote;
