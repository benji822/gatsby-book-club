import React, { useContext } from "react"
import { graphql } from "gatsby"
import { FirebaseContext } from "../components/firebase"

import BookItem from "../components/bookItem"
import { BookComments } from "../components/common"

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
      id
      summary
      title
      localImage {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      author {
        name
      }
    }
  }
`

const BookTemplate = props => {
  const { firebase } = useContext(FirebaseContext)

  return (
    <section>
      <BookItem
        bookTile={props.data.book.title}
        bookSummary={props.data.book.summary}
        bookAuthor={props.data.book.author.name}
        bookCover={props.data.book.localImage.childImageSharp.fixed}
      />
      {!!firebase && (
        <BookComments firebase={firebase} bookId={props.data.book.id} />
      )}
    </section>
  )
}

export default BookTemplate
