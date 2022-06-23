import * as React from "react"
import { Routes, Route, Link, useParams } from 'react-router-dom'
import axios from 'axios';
import "../App/App.css"
import * as ReactBootStrap from 'react-bootstrap'
import ProductView from "./ProductView";
import Hero from "../Home/Hero";
import SubNavBar from "../Home/SubNavBar";
import "../Home/Home.css"

export default function ProductDetail({ handleAddItemToCart, handleRemoveItemFromCart, returnQuantity, setSearch, setCategory, search }) {
    const [product, setProduct] = React.useState(null)
    const [spinner, setSpinner] = React.useState(false);  
    const params = useParams()
    let productId = params.productId

    const fetchProductData = async () => {
        const URL = `https://codepath-store-api.herokuapp.com/store/${productId}`
        const data = await axios(URL)
        setSpinner(true)
        
        setProduct(data.data.product)
    }

    React.useEffect(() => {
        fetchProductData()
    }, [])

    return (
        <div className="product-detail">
            <Hero />
            <SubNavBar setSearch={setSearch} setCategory={setCategory} search={search} />
            {spinner ? <ProductView 
                product={product}
                productId={productId}
                quantity={returnQuantity(productId)}
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