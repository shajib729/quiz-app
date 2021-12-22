import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
import {SyncLoader} from "react-spinners";
import GmailButton from './GmailButton';

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState()

    const { login } = useAuth()
    const navigate = useNavigate()
    
    async function handleSubmit(e) { 
        e.preventDefault();
        
        // validation
        // if (password) {
        //     return setError("Password don't match !")
        // }
        try {
            setError("")
            setLoading(true)
            await login(email, password);
            setLoading(false);
            navigate("/")
        } catch (err) {
            console.log(err.message);
            setLoading(false);
            err.message === "Firebase: Error (auth/user-not-found)." ? setError(" There is no account with this email!")
                :
            err.message==="Firebase: Error (auth/wrong-password)." ? setError("Wrong Password") : setError("Failed to Login!");
        }
     }

    return (
        <Form onSubmit={handleSubmit} style={{height:"330px"}}>
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
                placeholder="Enter 
                password" icon="lock" 
                value={password}
                required
                onChange={(e)=>setPassword(e.target.value)}                
            />

          <Button>{loading? <SyncLoader color={"white"} loading={loading} size={10} /> : "Submit Now"}</Button>

          {/* login with gmail  */}
          <GmailButton text={"Login with Gmail"}/>
        
          {error && <p className='error'>{error}</p>}

          <div className="info">
            Don't have an account? <NavLink to="/signup">Signup</NavLink> instead.
          </div>
        </Form>
    )
}

export default LoginForm
