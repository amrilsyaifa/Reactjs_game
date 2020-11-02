import React from 'react'
import "./Background.css";

export default function Background(props) {
    return (
        <div className="background-wrap">
            {props.children}
        </div>
    )
}
