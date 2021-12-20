import React from 'react'
import { NavLink } from 'react-router-dom'
import image from '../images/3.jpg'
import classes from '../styles/Video.module.css'

const Video = () => {
    return (
        <NavLink to="/quiz">
            <div className={classes.video}>
                <img src={image} alt="Video Title" />
                <p>#23 React Hooks Bangla React useReducer hook</p>
                <div className={classes.qmeta}>
                    <p>10 Questions</p>
                    <p>Score : Not taken yet</p>
                </div>
            </div>
        </NavLink>
    )
}

export default Video
