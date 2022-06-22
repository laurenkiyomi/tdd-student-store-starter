import * as React from "react"
import "./Home.css"
import Hero from "./Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import SubNavBar from "./SubNavBar"

export default function Home({ products, handleAddItemToCart, handleRemoveItemFromCart, setSearch, setCategory, search }) {
  return (
    <div className="home">
      <Hero />
      <SubNavBar setSearch={setSearch} setCategory={setCategory} search={search} />
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
