import {ETodoActionType, ETodoSort, ITodoAction, ITodoReduxState} from "../types";

const initialState: ITodoReduxState = {
    todos: [],
    lastAction: null,
    id: 1,
    sort: ETodoSort.ID_SORT
};

export const todoReducer = ( state = initialState, action:ITodoAction )=>{

    switch (action.type) {
        case ETodoActionType.ADD_TODO:
            return {
                ...state,
                todos: [...action.todos],
                id: ++state.id
            };
        case ETodoActionType.RECOVERY_TODO:
            return {
                ...state,
                todos: [...action.todos],
            };
        case ETodoActionType.REMOVE_TODO:
            return {
                ...state,
                todos: [...action.todos],
                lastAction: action.lastAction
            };
        case ETodoActionType.EDIT_TODO:
            return {
                ...state,
                todos: [...action.todos],
                lastAction: {...action.lastAction}
            };
        case ETodoActionType.CHECK_TODO:
            return {
                ...state,
                todos: state.todos.map(v=>{
                    if (v.id === action.id){
                        return {...v, checked:true}
                    }
                    return v;
                })
            };
        case ETodoActionType.UNCHECK_TODO:
            return {
                ...state,
                todos: state.todos.map(v=>{
                    if (v.id === action.id){
                        return {...v, checked:false}
                    }
                    return v;
                })
            };
        case ETodoActionType.TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(v=>{
                    if (v.id === action.id){
                        return {...v, checked:!v.checked}
                    }
                    return v;
                })
            };
        case ETodoActionType.SET_LAST_ACTION:
            return {
                ...state,
                lastAction: action.lastAction
            };
        case ETodoActionType.UNDO_LAST_ACTION:
            return {
                ...state,
                lastAction: null
            };
        case ETodoActionType.CLEAR_TODO:
            return {
                ...state,
                lastAction: null,
                todos: [],
                id: 1
            };
        case ETodoActionType.SORT_TODO:
            return {
                ...state,
                todos: [...action.sort.todos],
                sort: action.sort.type
            };
        case ETodoActionType.ADD_BATCH_TODO:
            return {
                ...state,
                todos: [...state.todos, ...action.todos],
                id: action.id
            };
        default:
            return state;

    }
};