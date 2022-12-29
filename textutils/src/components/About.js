import React, { useState } from 'react'

export default function About() {
    const [myStyle, setStyle] = useState({
        color: 'black',
        backgroundColor: 'white'
    });
    const [btnText, setBtnText] = useState("enable dark mode")
    const togglebutton = () => {
        if (myStyle.color === 'black') {
            setStyle({
                color: 'white',
                backgroundColor: 'black'
            })
            setBtnText("enable light mode")
        }
        else {
            setStyle({
                color: 'black',
                backgroundColor: 'white'
            })
            setBtnText("enable dark mode")
        }
    }
    return (
        <>
            <div className="container" style={myStyle}>
                <h1 className="text-center">
                    About Us
                </h1>
                <p className='text-center'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, in?
                </p>
                <center><button type="button " className="btn btn-outline-success my-3" onClick={togglebutton}>{btnText}</button></center>
            </div>
        </>
    )
}
