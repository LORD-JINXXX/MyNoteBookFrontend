import * as types from "../actionType/folderActionType";
import fire from "../../config/firebase";

//Action for fetch loading

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload
});

//Action for new folder

const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload
});

//Action creators for new folder

export const createFolder = (data) => (dispatch) => {
    fire
        .firestore()
        .collection("folders")
        .add(data)
        .then(async (folder) => {
            const folderData = await (await folder.get()).data();
            const folderId = folder.id;
            dispatch(addFolder({ data: folderData, folderId: folderId }));
        })
};

//Action for fetch folder

const fetchFolders = (payload) => ({
    type: types.FETCH_FOLDERS,
    payload
});

//Action creators for fetch folder

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
        .firestore()
        .collection("folders")
        .where("userId", "==", userId)
        .get()
        .then(async (folders) => {
            const folderData = await folders.docs.map((folder) => ({
                data: folder.data(),
                folderId: folder.id
            }))

            dispatch(fetchFolders(folderData));
            dispatch(setLoading(false));
        })
};

////Action for change folder

const setChangeFolder = (payload) => ({
    type: types.CHANGE_FOLDER,
    payload
});

//Action creators for change folder

export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId));
};



//Action for delete folder

export const deleteFolderRequest = (folderId) => ({
    type: types.DELETE_FOLDER,
    payload: folderId,
});


//Action for rename folder

const renameFolderRequest = (payload) => ({
    type: types.RENAME_FOLDER,
    payload
});


//Action creators for rename folder

export const renameFolder = (folderId, data) => (dispatch) => {
    fire
        .firestore()
        .collection("folders")
        .doc(folderId)
        .update(data)
        .then(
            dispatch(renameFolderRequest(folderId,data))
        )
};


//Note

//Action for create new note

const addNote = (payload) => ({
    type: types.CREATE_NOTE,
    payload
});


//Action creators for new note

export const createNote = (data,setSuccess) => (dispatch) => {
    fire
        .firestore()
        .collection("notes")
        .add(data)
        .then(async (note) => {
            const noteData = await (await note.get()).data();
            const noteId = note.id;
            dispatch(addNote({ data: noteData, noteId: noteId }));
            setSuccess(true);
        }).catch(()=>{
            setSuccess(false);
        })
};


//Action for fetch notes

const fetchNotes = (payload) => ({
    type: types.FETCH_NOTE,
    payload
});

//Action creators for fetch notes

export const getNotes = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
        .firestore()
        .collection("notes")
        .where("userId", "==", userId)
        .get()
        .then(async (notes) => {
            const noteData = await notes.docs.map((note) => ({
                data: note.data(),
                noteId: note.id
            }))

            dispatch(fetchNotes(noteData));
            dispatch(setLoading(false));
        })
};


//Action for rename note

const renameNoteRequest = (payload) => ({
    type: types.RENAME_NOTE,
    payload
});


//Action creators for rename note

export const renameNote = (noteId, data) => (dispatch) => {
    fire
        .firestore()
        .collection("notes")
        .doc(noteId)
        .update(data)
        .then(
            dispatch(renameNoteRequest(noteId,data))
        )
};

//Action for delete note

const deleteNoteRequest = (noteId) => ({
    type: types.DELETE_NOTE,
    payload: noteId,
});


//Action creator for delete note
export const deleteNote = (noteId) => (dispatch) => {
    fire
        .firestore()
        .collection("notes")
        .doc(noteId)
        .delete()
        .then(
            dispatch(deleteNoteRequest(noteId))
        )
}


//Action for edit note content and title

const editNoteRequest = (payload) => ({
    type: types.EDIT_NOTE,
    payload
});


//Action creator for edit note content and title
export const editNote = (noteId, data) => (dispatch) => {
    fire
        .firestore()
        .collection("notes")
        .doc(noteId)
        .update(data)
        .then(
            dispatch(editNoteRequest(noteId, data))
        )
}








