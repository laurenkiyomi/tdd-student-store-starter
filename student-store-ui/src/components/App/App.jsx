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
  const [checkoutForm, setCheckoutForm] = React.useState({name: "", email: ""})
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

  const returnQuantity = (productId) => {
    let quant = 0
    shoppingCart.forEach((item) => {
        if (item.productId === productId) {
            quant = item.quantity
        }
    }
  )
 
  return quant
  }

  const handleAddItemToCart = (productId) => {
    let temp = []
    let inArray = false

    shoppingCart.forEach((item) => {
      if (item.productId === productId) {
        let newItem = {
          productId: productId,
          quantity: item.quantity + 1
        }

        inArray = true
        temp.push(newItem)
      }

      else {
        temp.push(item)
      }
    })


    if (!inArray) {
      let newItem2 = {
        productId: productId,
        quantity: 1
      }

      temp.push(newItem2)
    }

    setShoppingCart(temp)
  }

  const handleRemoveItemFromCart = (productId) => {
    let temp = []
    shoppingCart.forEach((item) => {
      if (item.productId = productId) {
        if (item.quantity > 1) {
          item.quantity -= 1
          temp.push(item)
        }
      }

      else {
        temp.push(item)
      }
    })

    setShoppingCart(temp)
  }

  const handleOnCheckoutFormChange = (name, value) => {
    if (name === "email") {
      setCheckoutForm((old) =>
        ({ name: old.name, 
          email: value })
    )}

    else if (name === "name") {
      setCheckoutForm((old) =>
        ({ name: value, 
          email: old.email })
    )}

    
  }

  const handleOnSubmitCheckoutForm = () => {
    if (shoppingCart.length === 0) {
      setError("No cart or items in cart found to checkout.")
    }

    else if (checkoutForm.name.length === 0 || checkoutForm.email.length === 0) {
      setError("User info must include an email and name.")
    }

    else {
      setError("Success")
      //setCheckoutForm({name: "", email: ""})
      //setShoppingCart([])
    }
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
            handleOnToggle={handleOnToggle}
            returnQuantity={returnQuantity}
            error={error}/>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home 
              products={products} 
              handleAddItemToCart={handleAddItemToCart} 
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              setSearch={setSearch}
              setCategory={setCategory}
              search={search}
              returnQuantity={returnQuantity}/>}/>
            <Route path="/products/:productId" element={<ProductDetail 
              handleAddItemToCart={handleAddItemToCart} 
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              returnQuantity={returnQuantity}
              setSearch={setSearch}
              setCategory={setCategory}
              search={search}/>}/>
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
