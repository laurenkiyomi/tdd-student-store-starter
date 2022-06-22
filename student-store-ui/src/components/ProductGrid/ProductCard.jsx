import * as React from "react"
import { Link } from "react-router-dom";

export default function ProductCard({ product, name, productId, quantity, handleAddItemToCart, handleRemoveItemToCart, showDescription, image }) {
    const productURL = `/products/${productId}`
    let price = product.price.toFixed(2) + ""
    if (price.length < 3) {
        price = "0" + price
    }

    return (
        <div className="product-card">
            <Link to={productURL} className="product-image product-link" ><img className="product-image" src={image} alt={name}/></Link>
            <div className="product-card-text">
                <h2 className="product-name">{name}</h2>
                <p className="product-price">{`$${price}`}</p>
                {showDescription ? <p className="product-description">{product.description}</p> : ""}
            </div>
        </div>
    )
}