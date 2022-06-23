import * as React from "react"
import axios from 'axios';
import "./ShoppingCart.css"

export default function ShoppingCart({ isOpen, products, shoppingCart, returnQuantity }) {  
    var subtotal = 0
    return (
        <div className="shopping-cart">
            {shoppingCart.length===0 ? 
                <p className="notification">No items added to cart yet. Start shopping now!</p> : 
                <div className="cart-contents">
                    {shoppingCart.map((item) => {
                        return (
                            <ProductRow key={item.productId} item={item} quantity={returnQuantity(item.productId)} subtotal={subtotal}/>
                        )
                    })}
                    
                    <div className="receipt subtotal">
                        <span>SUBTOTAL</span>
                        <span>{`$${subtotal.toFixed(2)}`}</span>
                    </div>
                    <div className="receipt total-price">
                        <span>SUBTOTAL</span>
                        <span>{`$${(subtotal * 1.0875).toFixed(2)}`}</span>
                    </div>
                </div>}
        </div>
    )
}

export function ProductRow({ item, quantity, subtotal }) {
    const [product, setProduct] = React.useState(null)

    const fetchProductData = async () => {
        const URL = `https://codepath-store-api.herokuapp.com/store/${item.productId}`
        const data = await axios(URL)
        setProduct(data.data.product)
    }

    React.useEffect(() => {
        fetchProductData()
    }, [])

    // Don't show the product unless we have fetched the product
    if (!product) { return null; }

    return (
        <div className="product-row">
            <div className="cart-item-name">{product.name}</div>
            <div className="cart-item-quantity">{quantity}</div>
            <div className="cart-item-unit-price">{`$${product.price.toFixed(2)}`}</div>
            <div className="cart-item-price">{`$${(product.price * quantity).toFixed(2)}`}</div>
        </div>
    )


}