import * as types from "../actionType/folderActionType";

const initialState = {
    isLoading: true,
    currentFolder: "root",
    userFolders: [],
    userNotes: [],
    adminFolders: [],
    adminNotes: [],
};

const folderReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.CREATE_FOLDER:
            return {
                ...state,
                userFolders: [...state.userFolders, action.payload],
            };
        
        case types.FETCH_FOLDERS:
            return {
                ...state,
                userFolders: action.payload,
            };

        case types.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }; 
            
        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder: action.payload,
            };
        
        case types.DELETE_FOLDER:
            return {
                ...state,
                isLoading: true,
            };

        case types.RENAME_FOLDER:
            return {
                ...state,
                isLoading: true,
            };      
        
        case types.CREATE_NOTE:
            return {
                ...state,
                userNotes: [...state.userNotes, action.payload],
            };
            
        case types.FETCH_NOTE:
            return {
                ...state,
                userNotes: action.payload,
            };

        case types.DELETE_NOTE:
        return {
            ...state,
            isLoading: true,
        };

        case types.RENAME_NOTE:
            return {
                ...state,
                isLoading: true,
            };

        case types.EDIT_NOTE:
        return {
            ...state,
            isLoading: true,
        };

        default:
            return state;
    }
};

export default folderReducer;