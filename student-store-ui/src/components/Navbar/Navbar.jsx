import * as React from "react"
import "./Navbar.css"
import Logo from "./Logo"

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <Logo />
      <a id="home-jump" href="#home"><button>Home</button></a>
      <a id="about-jump" href="#about"><button>About</button></a>
      <a id="contact-jump" href="#contact"><button>Contact Us</button></a>
    </nav>
    
  )
}
