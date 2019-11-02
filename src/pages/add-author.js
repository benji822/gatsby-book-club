import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../components/firebase"
import styled from "styled-components"

import { Form, Input, Button } from "../components/common/"

const ReponseMsgWrapper = styled.div`
  ${props => (props.success ? "color: green;" : "color: red;")}
  margin-top: -10px;
  margin-bottom: 15px;
  font-size: 14px;
`

const AddAuthor = () => {
  const { firebase } = useContext(FirebaseContext)
  const [authorName, setAuthorName] = useState("")
  const [reponseMsg, setReponseMsg] = useState({ message: "", status: false })
  let isMounted = true

  useEffect(() => {
    return () => {
      isMounted = false
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    firebase
      .createAuthor({ authorName })
      .then(() => {
        if (isMounted) {
          setReponseMsg({
            message: "Author successfully added",
            status: true,
          })
        }
      })
      .catch(error => {
        if (isMounted) {
          setReponseMsg({
            message: error.message,
            status: false,
          })
        }
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Author name"
        onChange={e => {
          e.persist()
          setReponseMsg({
            message: "",
            status: false,
          })
          setAuthorName(e.target.value)
        }}
        value={authorName}
      />
      {!!reponseMsg && (
        <ReponseMsgWrapper success={reponseMsg.status}>
          {reponseMsg.message}
        </ReponseMsgWrapper>
      )}
      <Button type="submit" block>
        Add new author
      </Button>
    </Form>
  )
}

export default AddAuthor
