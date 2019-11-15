import * as React from "react";

import "./Item.scss";

import {Header} from "../../Header/Header";
import {match, Redirect} from "react-router";
import {ITodo, ITodoReduxState} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {addTodoAction, editTodoAction} from "../../../actions";
import {Formik, Form, FormikValues, FormikBag, FormikProps} from "formik";
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";
import {Text} from "../../Text/Text";
import {useState} from "react";
import * as Yup from "yup"

interface IItemMatch{
    id: string
}

interface IItemProps{
    match?: match<IItemMatch>
}

export function Item(props:IItemProps) {
    const [redirect, setRedirect] = useState(false);
    let item:ITodo = {
        id: 0,
        checked: false,
        title: "",
        description: "",
        date: (new Date()).getTime()
    };
    if (props.match && props.match.params.id){
        const todos = useSelector((state:{todo: ITodoReduxState})=>{return state.todo.todos});
        item = todos.find(v=>(v.id === +props.match.params.id));
    }

    const dispatch = useDispatch();

    let handleSubmit = (values:FormikValues, { setErrors }: FormikBag<FormikProps<FormikValues>, FormikValues> )=>{
        if (props.match && props.match.params.id) {
            dispatch(editTodoAction({...item, title: values.title, description: values.description}));
        }else{
            dispatch(addTodoAction({
                id:0,
                checked:false,
                title: values.title,
                description: values.description,
                date: (new Date()).getTime()
            }));
        }
        setRedirect(true);

    };

    let redirectHome = ()=>{
        if (!item || redirect){
            return <Redirect to={"/"}/>;
        }else{
            return (
                <div>
                    <Header/>
                    <Formik
                        initialValues={{title:item.title, description:item.description}}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            title: Yup.string().required("Title required"),
                            description: Yup.string().required("Description required")
                        })}
                    >
                        {({
                              values,
                              errors,
                              handleChange,
                              handleBlur

                          })=>(
                            <Form>
                                <div className="item__field">
                                    <Input type={"text"} name={"title"} placeholder={"Title"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.title}
                                           autocomplete={"off"}
                                           centered={true}
                                    />
                                    <div className="item__error">
                                        {errors.title}
                                    </div>
                                </div>
                                <div className="item__field">
                                    <Text name={"description"} placeholder={"Description"}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.description}
                                          centered={true}
                                    />
                                    <div className="item__error">
                                        {errors.description}
                                    </div>
                                </div>
                                <div className="item__button">
                                    <Button text="Save"/>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )
        }
    };
    return (
        <div className="container container_big">
            {redirectHome()}
        </div>

    );
}