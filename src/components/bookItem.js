import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const BookItemWrapper = styled.section`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  margin: 20px 0;
  padding: 20px;
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
  }

  small {
    font-size: 14px;
    font-weight: normal;
  }
`

const BookItemImageWrapper = styled.div`
  max-width: 200px;

  @media (max-width: 650px) {
    align-self: center;
  }

  img {
    max-width: 200px;
  }
`

const BookItemContentWrapper = styled.div`
  flex-grow: 1;
  padding-left: 15px;
`

const BookItem = ({
  bookTile,
  bookSummary,
  bookAuthor,
  bookCover,
  children,
}) => {
  return (
    <BookItemWrapper>
      <BookItemImageWrapper>
        <Img fixed={bookCover} />
      </BookItemImageWrapper>
      <BookItemContentWrapper>
        <h2>
          {bookTile} <small>{bookAuthor}</small>
        </h2>
        <p>{bookSummary}</p>
        <React.Fragment>{children}</React.Fragment>
      </BookItemContentWrapper>
    </BookItemWrapper>
  )
}

export default BookItem
