import React, { useState } from 'react'


export default function TextForm(props) {
    const [text, setText] = useState('');
    const handleOnChange = (event) => {
        console.log('text was changed');
        setText(event.target.value);
    }

    const changeUpCase = () => {
        console.log('text is now changed to uppercase');
        const newText = text.toUpperCase();
        setText(newText);
    }

    const changeLowCase = () => {
        console.log('changed to lowercase');
        const newText = text.toLowerCase();
        setText(newText);
    }
    const clearText = () => {
        console.log('textbox cleared');
        const newText = '';
        setText(newText);
    }
    return (
        <>
            <div className="container my-3">
                <h2 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>{props.heading}</h2>
                <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8" placeholder='enter text' style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}></textarea>
                <button className="btn btn-primary my-2 mx-2" onClick={changeUpCase}>change to uppercase</button>
                <button className="btn btn-primary my-2 mx-2" onClick={changeLowCase}>change to lowercase</button>
                <button className="btn btn-primary my-2 mx-2" onClick={clearText}>clear text</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h2>Text Summary</h2>
                {/* to get word count,character count and read time */}
                <p>{text.split(' ').length} words</p>
                <p>{text.length} characters</p>
                <p>{0.008 * text.split(' ').length} minutes total read time</p>
                <p>{text}</p>
            </div>
        </>
    )
}
