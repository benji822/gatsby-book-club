import React, { useEffect, useState, useContext } from "react"
import { FirebaseContext } from "../components/firebase"
import styled from "styled-components"

import { Form, Input, Button } from "../components/common"

const FormField = styled.div`
  margin-bottom: 15px;
  color: #333;

  input {
    height: 53px;
  }
`

const FormSelect = styled.select`
  width: 100%;
  background: transparent;
  height: 53px;
  border: 1px solid #ddd;
  font-size: 14px;
  border-radius: 8px;
  color: #666;

  &:focus,
  &:active {
    outline: none;
  }
`

let fileReader
if (typeof window !== "undefined") {
  fileReader = new FileReader()
}

const Addbook = () => {
  const { firebase } = useContext(FirebaseContext)

  const [authors, setAuthors] = useState([])
  const [bookCover, setBookCover] = useState("")
  const [bookName, setBookName] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [summary, setSummary] = useState("")
  const [success, setSuccess] = useState(false)

  let isMounted = true

  useEffect(() => {
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    fileReader.addEventListener("load", () => {
      setBookCover(fileReader.result)
    })
  }, [])

  useEffect(() => {
    // query all available authors
    if (firebase) {
      firebase.getAuthors().then(snapshot => {
        if (isMounted) {
          const availableAuthors = []
          snapshot.forEach(doc => {
            availableAuthors.push({
              id: doc.id,
              ...doc.data(),
            })
          })

          setAuthorId(availableAuthors[0].id)

          setAuthors(availableAuthors)
        }
      })
    }
  }, [firebase])

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        firebase
          .createBook({
            bookCover,
            bookName,
            authorId,
            summary,
          })
          .then(() => {
            if (isMounted) {
              setSuccess(true)
            }
          })
      }}
    >
      <FormField>
        <Input
          placeholder="book name"
          value={bookName}
          onChange={e => {
            e.persist()
            setSuccess(false)
            setBookName(e.target.value)
          }}
        />
      </FormField>
      <FormField>
        <label>
          {`Author: `}
          <FormSelect
            value={authorId}
            onChange={e => {
              e.persist()
              setSuccess(false)
              setAuthorId(e.target.value)
            }}
          >
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </FormSelect>
        </label>
      </FormField>
      <FormField>
        <label>
          {`Book cover: `}
          <Input
            type="file"
            onChange={e => {
              e.persist()
              setSuccess(false)
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </label>
      </FormField>
      <FormField>
        <label>
          {`Summary: `}
          <Input
            type="text"
            placeholder="Book summary"
            value={summary}
            onChange={e => {
              e.persist()
              setSuccess(false)
              setSummary(e.target.value)
            }}
          />
        </label>
      </FormField>
      <FormField>
        {!!success && <span>New book added successfully!</span>}
      </FormField>
      <Button type="submit">Add new book</Button>
    </Form>
  )
}

export default Addbook
