import * as React from "react"
import ProductCard from "./ProductCard"
import "./ProductGrid.css"

export default function ProductGrid({ products, handleAddItemToCart, handleRemoveItemFromCart }) {
    return (
        <div className="product-grid">
            {products.map((product) => {
                return (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        name={product.name}
                        productId={product.id} 
                        quantity={0}
                        handleAddItemToCart={handleAddItemToCart}
                        handleRemoveItemToCart={handleRemoveItemFromCart}
                        showDescription={false}
                        image={product.image}/>
                )
            })}
        </div>
    )
}




