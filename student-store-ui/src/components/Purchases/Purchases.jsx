import * as React from "react"
import axios from "axios"
import "./Purchases.css"

export default function Purchases( props ) {
    const purchasesURL = "http://localhost:3001/purchases"
    const productsURL = "http://localhost:3001/store"
    const [purchases, setPurchases] = React.useState([])
    const [products, setProducts] = React.useState([])

    async function fetchPurchases () {
        const data = await axios.get(purchasesURL)
        setPurchases(data.data.purchases)
    }

    async function fetchProducts () {
        const data = await axios.get(productsURL)
        setProducts(data.data.products)
    }

    React.useEffect(fetchPurchases, [])
    React.useEffect(fetchProducts, [])

    return (
        <div className="purchases">
            <h1>Past Orders</h1>
            <div className="purchases-list">
                {(purchases.length == 0) ? "No Orders Yet!" : purchases.map((purchase) => {
                    return (
                        <PurchaseItem key={purchase.id} purchase={purchase} products={products}/>
                    )
                })}
            </div>
        </div>
    )
}

export function PurchaseItem( { purchase, products } ) {
    const [expand, setExpand] = React.useState(false)

    const toggleExpand = () => {
        if (expand == true) {
            setExpand(false)
        }

        else {
            setExpand(true)
        }
    }

    return (
        <div className="purchase-item">
            <button className={`purchase-id ${expand ? "active" : ""}`} onClick={toggleExpand}>{`Purchase #${purchase.id}`}</button>
            <h2 className="purchaser">{`Made by: ${purchase.name}`}</h2>
            {expand ? <Receipt purchase={purchase} products={products}/> : ""}
        </div>
    )
}

export function Receipt({ purchase, products }) {
    const getName = (productId) => {
        let name = ""
        for(let i = 0; i < products.length; i++) {
            if (products[i].id == productId) {
                name = products[i].name
            }
        }

        return name
    }

    return (
        <div className="receipt">
            <h4 className="total-price">{`Total Price: $${(purchase.total).toFixed(2)}`}</h4>
            {purchase.order.map((item) => {
                return (
                        <div className="receipt-item" key={item.itemId}>
                            <span className="material-icons md-48">arrow_right</span>
                            <span className="item-name">{`${getName(item.itemId)}: ${item.quantity}`}</span>
                        </div>
                )
            })}
        </div>
    )
}