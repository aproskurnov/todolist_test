import * as React from "react";

import "./Button.scss";

interface ButtonProps {
    text?: string,
    onClick?:(e:React.MouseEvent<HTMLElement>)=>void,
    disabled?:boolean,
    wide?:boolean
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button disabled={this.props.disabled} onClick={this.props.onClick} type={"submit"}
                    className={"button" + (this.props.wide ? " button_wide" : "")}>{this.props.text}</button>
        );
    }
}