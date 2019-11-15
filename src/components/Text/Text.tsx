import * as React from "react";

import "./Text.scss"

interface InputProps {
    placeholder?:string,
    name?:string,
    onChange?:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void,
    onBlur?:(e:React.FocusEvent<HTMLTextAreaElement>)=>void,
    onKeyDown?:(e:React.KeyboardEvent<HTMLTextAreaElement>)=>void,
    defaultValue?:number,
    value?:string|number,
    centered?:boolean,
}

export class Text extends React.Component<InputProps, {}> {
    constructor(props:InputProps) {
        super(props);
    }
    static defaultProps = {
        centered: false
    };

    renderTextarea(){
        return (
            <textarea className={"textarea__field" + (this.props.centered ? " textarea__field_centered" : "")}
                   onKeyDown={this.props.onKeyDown}
                   onChange={this.props.onChange}
                   onBlur={this.props.onBlur}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}
                   name={this.props.name}
                   placeholder={this.props.placeholder}
            />
        );
    }
    render() {
        return (
            <div className={"input"}>
                {this.renderTextarea()}
            </div>
        );
    }
}