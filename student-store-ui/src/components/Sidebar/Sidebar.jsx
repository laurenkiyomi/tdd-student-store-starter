import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../../CheckoutForm/CheckoutForm"
import ShoppingCart from "../ShoppingCart/ShoppingCart"

export default function Sidebar({ isOpen, shoppingCart, products, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle, returnQuantity, error }) {
  let sideBarState = isOpen ? "open" : ""

  return (
    /*<section className={`sidebar ${sideBarState}`}>
      <button className="toggle-button" onClick={handleOnToggle}>➡️</button>
      {isOpen ? "opened" : "closed"}
    </section>*/

    <section className={`sidebar ${sideBarState}`}>
      {isOpen ? <OpenedSideBar 
              isOpen={isOpen} 
              shoppingCart={shoppingCart} 
              products={products} 
              checkoutForm={checkoutForm}
              handleOnCheckoutFormChange={handleOnCheckoutFormChange} 
              handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} 
              handleOnToggle={handleOnToggle}
              returnQuantity={returnQuantity}
              error={error}/> : 
            <ClosedSideBar
              handleOnToggle={handleOnToggle}/>}
    </section>

    

  )
}

export function ClosedSideBar({ handleOnToggle }) {
  return (
      <button className="toggle-button" onClick={handleOnToggle}>open</button>
  )
}

export function OpenedSideBar({ isOpen, shoppingCart, products, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle, returnQuantity, error }) {
  return (
    <div className="open-sidebar">
      <button className="toggle-button" onClick={handleOnToggle}>close</button>
      <ShoppingCart 
        isOpen={isOpen}
        products={products}
        shoppingCart={shoppingCart}
        returnQuantity={returnQuantity}/>
      <CheckoutForm 
        isOpen={isOpen}
        shoppingCart={shoppingCart}
        checkoutForm={checkoutForm}
        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        error={error}/>
    </div>
  )
}
