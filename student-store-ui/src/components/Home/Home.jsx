import * as React from "react"
import "./Home.css"
import Hero from "./Hero"
import ProductGrid from "../ProductGrid/ProductGrid"

export default function Home({ products, handleAddItemToCart, handleRemoveItemFromCart, setSearch, setCategory }) {
  return (
    <div className="home">
      <Hero />
      <ProductGrid 
        products={products} 
        handleAddItemToCart={handleAddItemToCart} 
        handleRemoveItemFromCart={handleRemoveItemFromCart}/>
    </div>

  )
}

export function Footer(props) {
  return (
    <p>Footer</p>
  )
}
