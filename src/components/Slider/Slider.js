import React from 'react'

export default function Slider({value, onChange}) {
    return (
        <div>
            <p>Volume: </p>
            <input type="range" min="0" max="10" value={value} onChange={onChange} />
        </div>
        
    )
}
