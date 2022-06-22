import * as React from "react"
import { Routes, Route, Link, useParams } from 'react-router-dom'
import axios from 'axios';
import "../App/App.css"
import * as ReactBootStrap from 'react-bootstrap'
import ProductView from "./ProductView";

export default function ProductDetail({ handleAddItemToCart, handleRemoveItemFromCart }) {
    console.log('Run the render cycle')
    const [product, setProduct] = React.useState(null)
    const [spinner, setSpinner] = React.useState(false);  
    const params = useParams()
    let productId = params.productId

    const fetchProductData = async () => {
        const URL = `https://codepath-store-api.herokuapp.com/store/${productId}`
        const data = await axios(URL)
        setSpinner(true)
        
        console.log(data.data.product)
        setProduct(data.data.product)
       
    }

    React.useEffect(() => {
        fetchProductData()
    }, [])

    return (
        <div className="product-detail">
            {spinner ? <ProductView 
                product={product}
                productId={productId}
                quantity={0}
                handleAddItemToCart={handleAddItemToCart}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                showDescription={true}/> 
            : <LoadingScreen/>}
        </div>
    )
    
}

export function LoadingScreen(props) {
    return (
        <div className="loading-container">
            <h1 className="loading-text">Loading...</h1>
            <ReactBootStrap.Spinner animation="border"/>
        </div>
    )
}