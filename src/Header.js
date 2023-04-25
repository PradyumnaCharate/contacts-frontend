import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Store } from "./Store";
import { FaBars, FaUser } from "react-icons/fa";

export default function Header({ sidebarHandler }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  return (
    <>
      {userInfo ? (
        <Navbar className="header">
          <Container fluid>
            <Nav>
              <div
                className="nav-link header-link"
                onClick={() => sidebarHandler()}
                style={{cursor: 'pointer'}}
              >
                <FaBars />
              </div>
              <Link to="/admin/home" className="nav-link header-link">
                Home
              </Link>
            </Nav>
            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle
                  id="user_profile"
                  className="right-profile-logo"
                >
                  <img
                    src={userInfo.profile_image}
                    alt="profile_img"
                    className="dropdown-logo"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>
                    Signed in as
                    <br />
                    <b>{userInfo.fullname}</b>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link to="/view-profile/" className="dropdown-item">
                      <FaUser className="me-2" /> Profile
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  );
}
