import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Button } from "./Button"
import { Input } from "./Input"

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;
  align-items: center;

  @media (max-width: 650px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  ${Input} {
    margin-right: 10px;
    margin-bottom: auto;
    margin-top: auto;

    @media (max-width: 650px) {
      margin-bottom: 15px;
      margin-right: 0;
    }
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
  const [commentText, setCommentText] = useState("")

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

  const handlePostCommentSubmit = e => {
    e.preventDefault()
    console.log(commentText)
    firebase.postComment({
      text: commentText,
      bookId,
    })
  }

  return (
    <div>
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input
          type="text"
          onChange={e => {
            e.persist()
            setCommentText(e.target.value)
          }}
          value={commentText}
        />
        <Button type="submit">Post comment</Button>
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
