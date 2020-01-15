import React from 'react';


export const TextArea = ({textContent, updateText, direction}) => {
    return (
        <textarea className="code" style={{direction: direction}} defaultValue={textContent} rows="30" onChange={updateText} />
    );
}