import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Button } from "./Button"
import { Input } from "./Input"

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;
  align-items: center;

  ${Input} {
    margin-right: 10px;
    margin-bottom: auto;
    margin-top: auto;
  }

  ${Button} {
    margin: auto 0;
  }
`

const CommentListItem = styled.div`
  > strong {
    font-size: 0.9rem;
    color: #666;
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;

  p {
    margin: 0;
  }
`

export const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        const snapshotComments = []
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
          setComments(snapshotComments)
        })
      },
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <div>
      <CommentForm>
        <Input />
        <Button>Post comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>{comment.name}</strong>
          <p>{comment.text}</p>
        </CommentListItem>
      ))}
    </div>
  )
}
