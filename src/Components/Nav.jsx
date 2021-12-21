import React from 'react'
import {NavLink} from 'react-router-dom'
import Account from './Account'
import classes from '../styles/Nav.module.css'
import logo from '../images/logo-bg.png'
import { useAuth } from '../context/AuthContext'

const Nav = () => {
    console.log(useAuth());
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/" className={classes.brand}>
                        <img src={logo} alt="Learn with sumit logo" />
                        <h3>Learn With Sumit</h3>
                    </NavLink>
                </li>
            </ul>

            <Account/>
        </nav>
    )
}

export default Nav
