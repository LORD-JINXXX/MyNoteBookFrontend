import {combineReducers} from 'redux';
import folderReducer from './folderReducers';

const rootReducer = combineReducers({
    folderReducer: folderReducer,
});

export default rootReducer;