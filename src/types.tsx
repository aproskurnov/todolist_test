export interface ITodo {
    id: number,
    checked: boolean,
    title: string,
    description: string,
    date: number
}

export interface ILastAction{
    type:ETodoLastActionType,
    todo: ITodo
}

export interface ITodoReduxState {
    todos: ITodo[],
    lastAction: ILastAction,
    id: number,
    sort: ETodoSort
}

export interface IReduxState {
    todo: ITodoReduxState
}

export interface ITodoAction {
    type: ETodoActionType,
    todo?: ITodo,
    todos?: ITodo[],
    id?: number,
    lastAction?: ILastAction,
    sort?: ITodoSort
}

export interface ITodoSort{
    todos: ITodo[],
    type: ETodoSort
}
export enum ETodoSort {
    ID_SORT = "ID_SORT",
    TITLE_SORT = "TITLE_SORT",
    DATE_SORT = "DATE_SORT"
}

export enum ETodoLastActionType{
    DELETE = "DELETE",
    EDIT = "EDIT"
}

export enum ETodoActionType {
    ADD_TODO = "ADD_TODO",
    REMOVE_TODO = "REMOVE_TODO",
    EDIT_TODO = "EDIT_TODO",
    CHECK_TODO = "CHECK_TODO",
    UNCHECK_TODO = "UNCHECK_TODO",
    SET_LAST_ACTION = "SET_LAST_ACTION",
    UNDO_LAST_ACTION = "UNDO_LAST_ACTION",
    CLEAR_TODO = "CLEAR_ACTION",
    SORT_TODO = "SORT_TODO",
    TOGGLE_TODO = "TOGGLE_ACTION",
    RECOVERY_TODO = "RECOVERY_ACTION",
    ADD_BATCH_TODO = "ADD_BATCH_TODO"
}