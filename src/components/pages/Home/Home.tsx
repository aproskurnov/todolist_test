import * as React from "react";
import {Header} from "../../Header/Header";
import {SortList} from "../../SortList/SortList";
import {SnackBar} from "../../SnackBar/SnackBar";
import {useSelector} from "react-redux";
import {IReduxState} from "../../../types";

export function Home(props:{}){
    let lastAction = useSelector((state:IReduxState)=>{return state.todo.lastAction});
    const showSnackBar = ()=>{
        if(lastAction){
            return <SnackBar/>
        }
    };
    return (
        <div className="container container_big">
            <Header/>
            <SortList/>
            {showSnackBar()}
        </div>
    );
}