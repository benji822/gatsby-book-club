import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import BookItem from "../components/bookItem"

const LinkButton = styled.div`
  text-align: right;

  a {
    background: rebeccapurple;
    color: #fff;
    padding: 10px 20px;
    display: inline-block;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: indigo;
    }
  }
`

export const query = graphql`
  query AllBookQuery {
    allBook {
      edges {
        node {
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
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <section>
      {data.allBook.edges.map(book => {
        return (
          <BookItem
            key={book.node.id}
            bookTile={book.node.title}
            bookSummary={book.node.summary}
            bookAuthor={book.node.author.name}
            bookCover={book.node.localImage.childImageSharp.fixed}
          >
            <LinkButton>
              <Link to={`/book/${book.node.id}`}>Join conversation</Link>
            </LinkButton>
          </BookItem>
        )
      })}
    </section>
  )
}

export default IndexPage
