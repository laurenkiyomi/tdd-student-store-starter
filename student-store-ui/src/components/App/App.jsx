import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import axios from 'axios';
import ProductDetail from "../ProductGrid/ProductDetail"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [products, setProducts] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [shoppingCart, setShoppingCart] = React.useState([])
  const [checkoutForm, setCheckoutForm] = React.useState(null)
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const URL = "https://codepath-store-api.herokuapp.com/store"

  async function fetchData () {
    const data = await axios(URL)
    let temp = []
    let searchLength = search.length
    
    if (search === "" && category === "all") {
      setProducts(data.data.products)
    }

    else if (search === "") {
      (data.data.products).forEach((product) => {
        if (product.category === category) {
          temp.push(product)
        }
      })

      setProducts(temp)
    }

    else if (category === "all") {
      (data.data.products).forEach((product) => {
        if (product.name.substring(0, searchLength).toLowerCase() === search.toLowerCase()) {
          temp.push(product)
        }
      })

      setProducts(temp)
    }

    else {
      (data.data.products).forEach((product) => {
        if (product.category === category && product.name.substring(0, searchLength).toLowerCase() === search.toLowerCase()) {
          temp.push(product)
        }
      })

      setProducts(temp)
    }
  }

  React.useEffect(fetchData, [search, category])

  const handleOnToggle = () => {
    if (isOpen) {
      setIsOpen(false)
    }

    else {
      setIsOpen(true)
    }
  }

  const handleAddItemToCart = (productId) => {
      if (!shoppingCart.contains(productId)) {
        const newItem = {
          productId: productId,
          quantity: 1
        }
        setShoppingCart((oldShoppingCart) => [...oldShoppingCart, newItem])
      }

      else {
        shoppingCart.forEach((item) => {
          if (item.productId = productId) {
            item.quantity += 1
            return
          }
        })
      }
  }

  const handleRemoveItemFromCart = (productId) => {
    
  }

  const handleOnCheckoutFormChange = (name, value) => {

  }

  const handleOnSubmitCheckoutForm = () => {

  }

  return (
    <div className="app">
      <Sidebar 
            isOpen={isOpen} 
            shoppingCart={shoppingCart} 
            products={products} 
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange} 
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} 
            handleOnToggle={handleOnToggle}/>
      <BrowserRouter>
        <main>
          {/* <Navbar />
          <Sidebar 
            isOpen={isOpen} 
            shoppingCart={shoppingCart} 
            products={products} 
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange} 
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} 
            handleOnToggle={handleOnToggle}/> */}
          {/* <Home 
          products={products} 
          handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/> */}
        
          <Navbar />
          <Routes>
            <Route path="/" element={<Home 
              products={products} 
              handleAddItemToCart={handleAddItemToCart} 
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              setSearch={setSearch}
              setCategory={setCategory}
              search={search}/>}/>
            <Route path="/products/:productId" element={<ProductDetail 
              handleAddItemToCart={handleAddItemToCart} 
              handleRemoveItemFromCart={handleRemoveItemFromCart}/>}/>
            <Route path="*" element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>}/>
          </Routes>
          
        </main>
      </BrowserRouter>
    </div>
  )
}
