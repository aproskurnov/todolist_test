import * as React from "react";

import "./SortList.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {ETodoSort, IReduxState, ITodoReduxState} from "../../types";
import {removeTodoAction, sortTodoAction, toggleAction} from "../../actions";
import {useRef, useState} from "react";

export function SortList(props: {}){
    const todos = useSelector((state:IReduxState)=>{return state.todo.todos});

    const scrollDiv = useRef(null);
    const [offset, setOffset] = useState(0);
    let scrollObj = calculateScrollObjByOffset(offset);

    const dispatch = useDispatch();
    const handleDelete = (e:React.MouseEvent, id:number)=>{
        e.preventDefault();
        dispatch(removeTodoAction(id));
    };
    const getDateStr = (ts:number) => {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let d = new Date(ts);
        return d.getDay() + ' ' + months[d.getMonth()] + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    };
    const onSortClick = (e:React.MouseEvent, typeSort: ETodoSort)=>{
        e.preventDefault();
        dispatch(sortTodoAction(typeSort))
    };
    const handlerToggle = (e:React.ChangeEvent, id:number)=>{
        dispatch(toggleAction(id));
    };
    function calculateScrollObjByOffset(offset: number){

        let widowHeight = 800;
        let captionOffset = 80;
        let recordHeight = 30;
        let start;
        let topSpacer = offset;
        start = Math.ceil(offset / recordHeight);
        let count = Math.floor((widowHeight-captionOffset) / recordHeight);
        if (start > todos.length - count && (todos.length - count > 0)){
            start = todos.length - count;
        }

        if (todos.length < (count + start)){
            count = todos.length - start;
        }
        if (topSpacer > todos.length * recordHeight - count * recordHeight){
            topSpacer = todos.length * recordHeight - count * recordHeight;
        }
        let bottomSpacer = todos.length * recordHeight - topSpacer + captionOffset;
        return {
            start: start,
            count: count,
            topSpacer: topSpacer,
            bottomSpacer: bottomSpacer
        };
    }
    const handleScroll = (e:React.UIEvent)=>{
        e.preventDefault();
        setOffset(scrollDiv.current.scrollTop);
    };
    const renderList = ()=>{
        let todoElements:JSX.Element[] = [];
        for (let i = scrollObj.start; i < scrollObj.count + scrollObj.start; i++){
            let todoElement = (
                <div className="sort-list__row" key={todos[i].id}>
                    <div className="sort-list__cell">
                        <input onChange={(e:React.ChangeEvent)=>handlerToggle(e, todos[i].id)} type="checkbox" checked={todos[i].checked}/>
                    </div>
                    <div className="sort-list__cell">{todos[i].id}</div>
                    <div className="sort-list__cell">{todos[i].title}</div>
                    <div className="sort-list__cell">{todos[i].description}</div>
                    <div className="sort-list__cell">{getDateStr(todos[i].date)}</div>
                    <div className="sort-list__cell">
                        <Link to={"/item/"+todos[i].id+"/edit"}>
                            <FontAwesomeIcon icon={faEdit} size="1x" />
                        </Link>
                        <a onClick={(e:React.MouseEvent)=>handleDelete(e, todos[i].id)} href="/dynamic-link">
                            <FontAwesomeIcon icon={faTimes} size="1x" />
                        </a>
                    </div>
                </div>
            );
            todoElements.push(todoElement);
        }
        return todoElements;
    };

    let sortType = useSelector((state:IReduxState)=>state.todo.sort);

    return (
        <div onScroll={handleScroll} ref={scrollDiv} className="sort-list">
            <div className="sort-list__spacer" style={{ height: scrollObj.topSpacer + scrollObj.bottomSpacer }}/>
            <div className="sort-list__container" style={{position: "absolute", top:scrollObj.topSpacer}}>

                <div className="sort-list__table">
                    <div className="sort-list__caption">
                        <h2>Todo list</h2>
                    </div>
                    <div className="sort-list__header">
                        <div className="sort-list__header-cell"></div>
                        <div className={"sort-list__header-cell sort-list__header-cell_sortable"}>
                            <div className={"sort-list__sortable" + (sortType === ETodoSort.ID_SORT?" sort-list__sortable_sorted":"")}>
                                <a onClick={(e)=>onSortClick(e, ETodoSort.ID_SORT)} href={"/dynamic-link"}>
                                    id
                                </a>
                            </div>
                        </div>
                        <div className="sort-list__header-cell sort-list__header-cell_sortable">
                            <div className={"sort-list__sortable" + (sortType === ETodoSort.TITLE_SORT?" sort-list__sortable_sorted":"")}>
                                <a onClick={(e)=>onSortClick(e, ETodoSort.TITLE_SORT)} href={"/dynamic-link"}>
                                    title
                                </a>
                            </div>
                        </div>
                        <div className="sort-list__header-cell">description</div>
                        <div className="sort-list__header-cell sort-list__header-cell_sortable">
                            <div className={"sort-list__sortable" + (sortType === ETodoSort.DATE_SORT?" sort-list__sortable_sorted":"")}>
                                <a onClick={(e)=>onSortClick(e, ETodoSort.DATE_SORT)} href={"/dynamic-link"}>
                                    date
                                </a>
                            </div>
                        </div>
                        <div className="sort-list__header-cell"></div>
                    </div>
                    <div className="sort-list__body">
                        {renderList()}
                    </div>
                </div>

            </div>
        </div>
    );
}