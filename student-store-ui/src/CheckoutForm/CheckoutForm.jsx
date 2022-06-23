import * as React from "react"

export default function CheckoutForm({ isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, error }) {
    return (
        <div className="checkout-form">
            <input 
                required
                className="checkout-form-input"
                type="email"
                name="email"
                placeholder="student@codepath.org"
                value={checkoutForm.email}
                onChange={(event) => {handleOnCheckoutFormChange("email", event.target.value)}}
            ></input>
            <input 
                required
                className="checkout-form-input"
                type="text"
                name="name"
                placeholder="Student Name"
                value={checkoutForm.name}
                onChange={(event) => {handleOnCheckoutFormChange("name", event.target.value)}}
            ></input>
            <button className="checkout-button" onClick={handleOnSubmitCheckoutForm}>
                Checkout
            </button>
            {error === "Success" ? 
                <div className="success">{`Success! Your order will arrive soon, ${checkoutForm.name} <3`}</div> : 
                <div className="error">{error}</div>}
        </div>
    )
}