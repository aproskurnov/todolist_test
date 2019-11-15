import {combineReducers} from 'redux';
import {todoReducer} from "./todoReducer";

const reducer = combineReducers({
    todo: todoReducer
});

export default reducer;