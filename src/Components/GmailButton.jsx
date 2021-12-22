import React from 'react'
import classes from '../styles/GmailButton.module.css'
import google from '../images/google.png'
import { useAuth } from '../context/AuthContext'

const GmailButton = ({text}) => {

    const { gmailSignin } = useAuth()

    async function handleGmail() {
        await gmailSignin()
    }
    return (
        <div onClick={handleGmail} className={classes.gmail_button}>
            <img src={google} alt="" />
            <span>{text}</span>
        </div>
    )
}

export default GmailButton
