import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { FirebaseContext } from "../components/firebase"

import { Form, Button, Input, ErrorMessage } from "../components/common"

const Login = props => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)
  let isMounted = true

  useEffect(() => {
    return () => {
      isMounted = false
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then(() => navigate("/"))
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      })
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
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          value={formValues.email}
          placeholder="email"
          type="email"
          name="email"
          onChange={handleInputChange}
          required
        />
        <Input
          value={formValues.password}
          placeholder="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </section>
  )
}

export default Login
