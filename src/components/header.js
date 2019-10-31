import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from "./firebase"
import styled from "styled-components"

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  font-family: sans-serif;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;

  @media (max-width: 650px) {
    flex-wrap: wrap;
  }

  > h1 {
    margin: 0;
    flex-grow: 1;
    padding-right: 40px;

    @media (max-width: 540px) {
      margin-bottom: 15px;
    }

    > a {
      color: #fff;
      text-decoration: none;
    }
  }

  > div {
    margin: auto 0;
  }
`

const LogoutLink = styled.span`
  color: #fff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const UserInfo = styled.div`
  text-align: right;
  color: #fff;
`

const LoginLink = styled.div`
  color: #fff;
  margin: auto 0;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ededed;
`

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)
  const handleLogoutClick = () => {
    firebase.logout().then(() => navigate("/login"))
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/" style={{}}>
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              Hello, {user.username || user.email}
              <div>
                <LogoutLink onClick={handleLogoutClick}>Logout</LogoutLink>
              </div>
            </UserInfo>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </LoginLink>
          )}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
