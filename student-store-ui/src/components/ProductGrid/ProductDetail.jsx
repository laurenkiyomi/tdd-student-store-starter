import * as React from "react"
import { Routes, Route, Link, useParams } from 'react-router-dom'

export default function ProductDetail({ handleAddItemToCart, handleRemoveItemFromCart }) {
    const [product, setProduct] = React.useState()
    const params = useParams()
    let productId = params.productId

    return (
        <div className="product-detail">
            <p>Product Details</p>
        </div>
    )
    
}