import React from 'react'
import Illustration from '../Illustration'
import Form from '../Form'
import TextInput from '../TextInput'
import Checkbox from '../Checkbox'
import Button from '../Button'
import classes from '../../styles/Form.module.css'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    return (
        <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration/>
        <Form className={`${classes.signup}`}>
          <TextInput type="text" placeholder="Enter name" icon="person" />

          <TextInput
            type="text"
            placeholder="Enter email"
            icon="alternate_email"
          />

          <TextInput type="password" placeholder="Enter password" icon="lock" />

          <TextInput
            type="password"
            placeholder="Confirm password"
            icon="lock_clock"
          />

            <Checkbox text="I agree to the Terms & Conditions" style={{ marginBottom:"20px"}} />

          <Button>Submit Now</Button>

          <div className="info">
            Already have an account? <NavLink to="/login">Login</NavLink> instead.
          </div>
        </Form>
      </div>
    </>
    )
}

export default Signup
