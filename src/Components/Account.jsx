import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../styles/Account.module.css'
import {useAuth} from "../context/AuthContext"

const Account = () => {
    const {currentUser, logout} = useAuth()
    return (
        <div className={classes.account}>
            {
                currentUser ?
                <>
                <span className="material-icons-outlined" title="Account">
                account_circle
                </span>
                <span>{currentUser?.displayName}</span>
                <span className='material-icons-outlined' title="Logout" onClick={()=>logout()}>
                    logout
                </span>
                </>
                :
                <>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>
                </>
            }
        </div>
    )
}

export default Account
