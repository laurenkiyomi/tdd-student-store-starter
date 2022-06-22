import * as React from "react"

export default function ProductCard({ product, name, productId, quantity, handleAddItemToCart, handleRemoveItemToCart, showDescription, image }) {
    return (
        <div className="product-card">
            <img className="product-image" src={image} alt={name}/>
            <div className="product-card-text">
                <h2 className="product-name">{name}</h2>
            </div>
        </div>
    )
}