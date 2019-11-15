import * as React from "react";
import './Header.scss';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBiohazard } from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from "react-redux";
import {addBatchTodoAction, clearAction} from "../../actions";

export function Header(props:{}) {
    const dispatch = useDispatch();
    const clearList = (e:React.MouseEvent) => {
        e.preventDefault();
        dispatch(clearAction());
    };
    const addBatch = (e:React.MouseEvent) => {
        e.preventDefault();
        dispatch(addBatchTodoAction(1000000));
    };
    return (
        <header className="header">
            <Link to="/">
                <h2>TodoList</h2>
            </Link>
            <nav className="header__interface">
                <div className="header__ico">
                    <Link to="/item/create">
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                    </Link>
                </div>
                <div className="header__ico">
                    <Link onClick={clearList} to="/dynamic-link">
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </Link>
                </div>
                <div className="header__ico">
                    <Link onClick={addBatch} to="/dynamic-link">
                        <FontAwesomeIcon icon={faBiohazard} size="2x" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}