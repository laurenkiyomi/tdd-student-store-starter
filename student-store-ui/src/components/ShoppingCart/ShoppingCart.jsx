import * as React from "react"
import axios from 'axios';
import "./ShoppingCart.css"

export default function ShoppingCart({ isOpen, products, shoppingCart, returnQuantity }) {  
    const getSubtotal = () => {
        let subtot = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (products[j].id === shoppingCart[i].productId) {
                    subtot += returnQuantity(products[j].id) * products[j].price
                }
            }
        }

        return subtot
    }


    return (
        <div className="shopping-cart">
            {shoppingCart.length===0 ? 
                <p className="notification">No items added to cart yet. Start shopping now!</p> : 
                <div className="cart-contents">
                    {shoppingCart.map((item) => {
                        return (
                            <ProductRow key={item.productId} item={item} quantity={returnQuantity(item.productId)} products={products}/>
                        )
                    })}
                    
                    <div className="receipt subtotal">
                        <span>SUBTOTAL</span>
                        <span>{`$${(getSubtotal()).toFixed(2)}`}</span>
                    </div>
                    <div className="receipt total-price">
                        <span>SUBTOTAL</span>
                        <span>{`$${(getSubtotal() * 1.0875).toFixed(2)}`}</span>
                    </div>
                </div>}
        </div>
    )
}

export function ProductRow({ item, quantity, products }) {
    const [product, setProduct] = React.useState(null)

    const getProductData = async () => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === item.productId) {
                setProduct(products[i])
            }
        }
    }

    React.useEffect(() => {
        getProductData()
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