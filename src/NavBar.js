import React from "react"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Button } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import dera from "../dera.png"
import "styles/App.css"
import { css } from "styled-components/macro"
import { PrimaryButton as PrimaryButtonBase1 } from "components/misc/Buttons.js"
import tw from "twin.macro"
import { add } from "./addressSlice"
function NavBar() {
  const PrimaryButton = tw(
    PrimaryButtonBase1
  )` inline-block w-48  tracking-wide text-center `
  // const buttonRoundedCss = buttonRounded && tw`rounded-full`
  const Wallet = (e) => {
    e.preventDefault()
    document.getElementById("btn").style.display = "none"
    document.getElementById("number").style.display = "block"
  }
  const Close = () => {
    document.getElementById("btn").style.display = "block"
    document.getElementById("number").style.display = "none"
  }

  const mystyle = {
    fontSize: "24px",
    padding: "10px",
    fontFamily: "Arial",
    display: "none",
  }
  const closeStyle = {
    display: "block",
    text: "center",
    height: "40px",
  }
  const blockStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  }
  const address = useSelector((state) => state.address)

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            src={dera}
            width='100'
            height='50'
            className='d-inline-block align-top'
            alt=''
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/dera-vaults'>DERA Vaults</Nav.Link>
            <Nav.Link href='/dera-wallet'>DERA Wallet</Nav.Link>

            <Nav.Link href='/dera-staking'>DERA Staking</Nav.Link>
            <NavDropdown title='DERA Economy' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/dera-payroll'>
                DERA Payroll
              </NavDropdown.Item>
              <NavDropdown.Item href='/dera-payment'>
                DERA Payment
              </NavDropdown.Item>
              <NavDropdown.Item href='/dera-network'>
                DERA Network
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/branded-tokens'>Branded Tokens</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ul className='navbar-nav px-3'>
          <PrimaryButton as='a' href='#' onClick={Wallet} id='btn'>
            Connect Wallet
          </PrimaryButton>
          <div style={mystyle} id='number'>
            <div style={blockStyle}>
              <p> {address.value > 0 ? address.value : "Please Sign In"}</p>
              <Button color='primary' onClick={Close} style={closeStyle}>
                X
              </Button>
            </div>
          </div>
        </ul>
      </Container>
    </Navbar>
  )
}

export default NavBar
