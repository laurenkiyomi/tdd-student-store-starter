import * as React from "react"

export default function CheckoutForm({ isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <input 
            type="email" 
            name="email" 
            placeholder="student@codepath.org" 
            value={checkoutForm.email} 
            onChange={handleOnCheckoutFormChange} 
            className="checkout-form-input"/>
            <input 
                type="text"
                name="name"
                placeholder="Student Name"
                value={checkoutForm.name}
                onChange={handleOnCheckoutFormChange}
                className="checkout-form-input"/>
            <button className="checkout-button" onClick={handleOnSubmit}>Checkout</button>
        </div>
    )
}