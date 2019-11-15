import * as React from "react";

import "./SnackBar.scss";
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {undoTodoAction} from "../../actions";
import {ETodoLastActionType, IReduxState} from "../../types";

export function SnackBar(props: {}){
    let dispatch = useDispatch();
    let action = useSelector((state:IReduxState)=>state.todo.lastAction.type);
    const undoLastAction = ()=>{
        dispatch(undoTodoAction());
    };
    const actionLabel = ()=>{
            switch (action) {
                case ETodoLastActionType.DELETE:
                    return "deletion";
                case ETodoLastActionType.EDIT:
                    return "edition";
                default:
                    return;
            }
    };
    return (
        <div className="snack-bar">
            <Button onClick={undoLastAction} text={"Undo " + actionLabel()}/>
        </div>
    );
}