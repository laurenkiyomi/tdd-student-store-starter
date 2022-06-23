import * as React from "react"
import "./Home.css"
import Hero from "./Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import SubNavBar from "./SubNavBar"

export default function Home({ products, handleAddItemToCart, handleRemoveItemFromCart, setSearch, setCategory, search, returnQuantity }) {
  return (
    <div className="home">
      <Hero />
      <SubNavBar setSearch={setSearch} setCategory={setCategory} search={search} />
      <ProductGrid
        products={products} 
        handleAddItemToCart={handleAddItemToCart} 
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        returnQuantity={returnQuantity}/>
      <About />
      <Contact />
      <Footer />
    </div>

  )
}

export function About(props) {
  return (
    <div id="about" className="about">
      <h4>About</h4>
      <div className="about-container">
        <p className="about-text">tessssstttt</p>
        <img className="about-image" src="https://i.pinimg.com/originals/e8/fa/05/e8fa05ad1cad77030cb1e69a21fb3f3e.jpg"/>
      </div>
    </div>
  )
}

export function Contact(props) {
  return (
    <div id="contact" className="contact">
      <h4>Contact</h4>
      <div className="contact-container">
        <p className="contact-text">contactmeeee</p>
        <img className="contact-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIboOJ6GCxZUlWq5RBgUt8qfeZnXOKoaES4Q&usqp=CAU" />
      </div>
    </div>
  )
}

export function Footer(props) {
  return (
    <div className="footer">
      <h4>Footer</h4>
      <div className="footer-container">
        <p className="footer-text">foiejaoooterrrrrrr</p>
        <div className="footer-icons">icons</div>
      </div>
    </div>
  )
}


