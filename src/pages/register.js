import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/firebase"

import { Button, Input, Form, ErrorMessage } from "../components/common"

const Register = () => {
  const { firebase } = useContext(FirebaseContext)
  const [errorMessage, setErrorMessage] = useState("")

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (formValues.password === formValues.confirmPassword) {
      firebase
        .register({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        })
        .catch(error => {
          setErrorMessage(error.message)
        })
    } else {
      setErrorMessage("Password and Comfirm Password must be match!")
    }
  }

  const handleInputChange = e => {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="name"
        type="text"
        name="name"
        required
        value={formValues.name}
        onChange={handleInputChange}
      />
      <Input
        placeholder="email"
        type="email"
        name="email"
        required
        value={formValues.email}
        onChange={handleInputChange}
      />
      <Input
        placeholder="password"
        type="password"
        name="password"
        required
        minLength="6"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <Input
        placeholder="confirm password"
        type="password"
        name="confirmPassword"
        required
        minLength="6"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
      />
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default Register
