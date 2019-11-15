import * as React from "react";

import "./../../index.scss"

import {Route, Switch} from "react-router";
import {Home} from "../pages/Home/Home";
import {NoMatch} from "../pages/NoMatch/NoMatch";
import {BrowserRouter as Router} from "react-router-dom";
import {Item} from "../pages/Item/Item"
import {Provider} from "react-redux";
import store from "../../store"

export function App(){
    return (
        <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/item/create">
                            <Item/>
                        </Route>
                        <Route path="/item/:id/edit" component={Item}/>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </Router>
        </Provider>
    )
}