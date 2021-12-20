import React from 'react'
import Nav from './Nav'
import classes from '../styles/Layout.module.css'

const Layout = ({ children }) => {
    console.log(children);
    return (
        <div>
            <Nav />
            <main className={classes.main}>
                <div className={classes.container}>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
