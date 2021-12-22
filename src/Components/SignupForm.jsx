import React, { useState } from 'react'
import Form from './Form'
import TextInput from './TextInput'
import Checkbox from './Checkbox'
import Button from './Button'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {SyncLoader} from "react-spinners";
import GmailButton from './GmailButton'

const SignupForm = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [agree, setAgree] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState()

    const { signup } = useAuth()
    const navigate = useNavigate()
    
    async function handleSubmit(e) { 
        e.preventDefault();
        
        // validation
        if (password !== cpassword) {
            return setError("Password don't match !")
        }
        try {
            setError("")
            setLoading(true)
            await signup(email, password, username);
            setLoading(false);
            navigate("/")
        } catch (err) {
            setLoading(false);
            setError("Failed to create an account!");
        }
     }

    return (
        <>
        <Form onSubmit={handleSubmit} style={{height:"500px"}}>
            <TextInput 
                type="text" 
                placeholder="Enter name" 
                icon="person" 
                value={username}
                required
                onChange={(e)=>setUserName(e.target.value)}
            />

            <TextInput
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
            />

            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock" 
                value={password}
                required
                onChange={(e)=>setPassword(e.target.value)}
            />

            <TextInput
                type="password"
                placeholder="Confirm password"
                icon="lock_clock" 
                value={cpassword}
                required
                onChange={(e)=>setCpassword(e.target.value)}
            />

            <Checkbox
                text="I agree to the Terms & Conditions" style={{ marginBottom: "20px" }} 
                value={agree}
                required
                onChange={(e)=>setAgree(e.target.value)}
            />

            <Button disabled={loading}>{loading?<SyncLoader color={"white"} loading={loading} size={10} />:"Submit Now"}</Button>
            
            {/* sign in with gmail   */}
            <GmailButton text={"Sign in with Google"}/>

            {error && <p className='error'>{error}</p>}


            <div className="info">
            Already have an account? <NavLink to="/login">Login</NavLink> instead.
            </div>
        </Form>
    </>
    )
}

export default SignupForm
