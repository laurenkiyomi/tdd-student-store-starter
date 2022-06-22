import * as React from "react"

export default function ProductView({ product, productId, quantity, handleAddItemToCart, handleRemoveItemFromCart, showDescription }) {
    return (
        <div className="product-view">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{showDescription ? product.description : ""}</p> 
        </div>
    )
}