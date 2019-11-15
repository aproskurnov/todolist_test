import {Dispatch} from "redux";
import {
    ETodoActionType,
    ETodoLastActionType,
    ETodoSort,
    ILastAction,
    IReduxState,
    ITodo,
    ITodoAction,
    ITodoSort
} from "../types";


export const undoTodoAction:any = () => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    if (prevState.lastAction){
        switch (prevState.lastAction.type) {
            case ETodoLastActionType.DELETE:
                dispatch(recoveryTodoAction(prevState.lastAction.todo));
                dispatch(undoLastAction());
                break;
            case ETodoLastActionType.EDIT:
                dispatch(editTodoAction(prevState.lastAction.todo));
                dispatch(undoLastAction());
                break;
            default:
                return;
        }
    }
};

export const sortTodoAction:any = (sortType: ETodoSort) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {

    let prevState = getState().todo;
    let sortedTodos = [];
    switch (sortType) {
        case ETodoSort.ID_SORT:
            sortedTodos = prevState.todos.sort((a, b)=>{return a.id - b.id});
            break;
        case ETodoSort.TITLE_SORT:
            sortedTodos = prevState.todos.sort((a, b)=>{return a.title.localeCompare(b.title)});
            break;
        case ETodoSort.DATE_SORT:
            sortedTodos = prevState.todos.sort((a, b)=>{return a.date - b.date});
            break;
        default:
            return;
    }
    dispatch(sortAction({
        type:sortType,
        todos: sortedTodos
    }))
};

const addTodoToList = (todo:ITodo, todos:ITodo[], sort:ETodoSort) => {
    let index:number;
    let findIndexFunc = (v:ITodo)=>true;

    switch (sort) {
        case ETodoSort.ID_SORT:
            findIndexFunc = (v:ITodo)=>{ return v.id > todo.id};
            break;
        case ETodoSort.TITLE_SORT:
            findIndexFunc = (v:ITodo)=>{ return v.title.localeCompare(todo.title) === 1};
            break;
        case ETodoSort.DATE_SORT:
            findIndexFunc = (v:ITodo)=>{ return v.date > todo.date};
            break;
        default:
            return;
    }
    index = todos.findIndex(findIndexFunc);
    if (index === -1){
        todos.push(todo);
    }else{
        todos.splice(index, 0, todo);
    }
    return todos;
};
const removeTodoFromList = (id:number, todos: ITodo[])=>{
    return todos.filter(v=>{
        return v.id !== id;
    });
};

export const recoveryTodoAction:any = (todo:ITodo) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    let todos = addTodoToList(todo, prevState.todos, prevState.sort);
    dispatch(recoveryAction(todos));
};

export const addTodoAction:any = (todo:ITodo) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    todo.id = prevState.id;
    let todos = addTodoToList(todo, prevState.todos, prevState.sort);
    dispatch(addAction(todos));
};

export const editTodoAction:any = (todo:ITodo) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    let edited = prevState.todos.find(v=>v.id === todo.id);
    let todos = removeTodoFromList(todo.id, prevState.todos);
    todos = addTodoToList(todo, todos, prevState.sort);
    dispatch(editAction(todos, edited));
};

export const addBatchTodoAction:any = (count:number) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    let id = prevState.id;
    let todos:ITodo[] = [];
    for (let i = 0; i < count; i++){
        let obj:ITodo = {
            id: id,
            checked: false,
            title: "record" + id,
            description: "record" + id,
            date: (new Date()).getTime()
        };
        todos.push(obj);
        id++;
    }

    dispatch(addBatchAction(todos, id));

};

export const addAction = (todos:ITodo[]) => {
    let action:ITodoAction = {
        type: ETodoActionType.ADD_TODO,
        todos: todos
    };
    return action;
};

export const recoveryAction = (todos:ITodo[]) => {
    let action:ITodoAction = {
        type: ETodoActionType.RECOVERY_TODO,
        todos: todos
    };
    return action;
};

export const removeTodoAction:any = (id:number) => (dispatch:Dispatch<ITodoAction>, getState:()=>IReduxState) => {
    let prevState = getState().todo;
    let removed = prevState.todos.find(v=>v.id === id);
    let todos = removeTodoFromList(id, prevState.todos);
    dispatch(removeAction(todos, removed));
};

export const editAction = (todos:ITodo[], edited: ITodo) => {
    let action:ITodoAction = {
        type: ETodoActionType.EDIT_TODO,
        todos: todos,
        lastAction: {
            type: ETodoLastActionType.EDIT,
            todo: edited
        }
    };
    return action;
};

export const checkTodoAction = (id:number) => {
    let action:ITodoAction = {
        type: ETodoActionType.CHECK_TODO,
        id: id
    };
    return action;
};

export const uncheckTodoAction = (id:number) => {
    let action:ITodoAction = {
        type: ETodoActionType.UNCHECK_TODO,
        id: id
    };
    return action;
};

export const setLastAction = (lastAction:ILastAction) => {
    let action:ITodoAction = {
        type: ETodoActionType.SET_LAST_ACTION,
        lastAction: lastAction
    };
    return action;
};

export const undoLastAction = () => {
    let action:ITodoAction = {
        type: ETodoActionType.UNDO_LAST_ACTION,
    };
    return action;
};

export const clearAction = () => {
    let action:ITodoAction = {
        type: ETodoActionType.CLEAR_TODO,
    };
    return action;
};

export const sortAction = (sort:ITodoSort) => {
    let action:ITodoAction = {
        type: ETodoActionType.SORT_TODO,
        sort: sort
    };
    return action;
};

export const toggleAction = (id:number) => {
    let action:ITodoAction = {
        type: ETodoActionType.TOGGLE_TODO,
        id
    };
    return action;
};

export const addBatchAction = (todos:ITodo[], lastId: number) => {
    let action:ITodoAction = {
        type: ETodoActionType.ADD_BATCH_TODO,
        todos: todos,
        id: lastId
    };
    return action;
};

export const removeAction = (todos:ITodo[], removed:ITodo) => {
    let action:ITodoAction = {
        type: ETodoActionType.REMOVE_TODO,
        todos,
        lastAction: {
            type: ETodoLastActionType.DELETE,
            todo: removed
        }
    };
    return action;
};

