const { storage } = require("../data/storage")
const { BadRequestError } = require("../utils/errors")

class Store {
    constructor() {
        this.super();
    }

    static async listProducts() {
        // list all items in the products array
        const products = storage.get("products").value()
        return products
    }

    static async listPurchases() {
        // list all purchases in purchases array
        const purchases = storage.get("purchases").value()
        return purchases
    }
    
    static async fetchProductById(productId) {
        const product = storage
            .get("products").value()[productId - 1]
        return product
    }

    static async recordPurchase(purchase) {
        if (!purchase) {
            throw new BadRequestError(`No purchase sent.`)
        }

        let message = ""
        const requiredFields = ["shoppingCart", "user"]
        requiredFields.forEach((field) => {
            if (!purchase[field] && purchase[field] !== 0) {
                message = `Field: ${field} is required in purchase`
            }
        })

        if( message != "" ) {
            throw new BadRequestError(message)
        } 

        const requiredFields3 = ["name", "email"]
        requiredFields3.forEach((field) => {
            if (!purchase.user[field] && purchase.user[field] !== 0) {
                message = `User information requires ${field}`
            }
        })

        if( message != "" ) {
            throw new BadRequestError(message)
        } 

        if (purchase.shoppingCart.length == 0) {
            throw new BadRequestError(`Shopping cart must contain item(s)!`)
        }

        const requiredFields2 = ["quantity", "itemId"]

        requiredFields2.forEach(async (field) => {
            for (let i = 0; i < purchase.shoppingCart.length; i++) {
                if (!(purchase.shoppingCart[i])[field] && (purchase.shoppingCart[i])[field] !== 0) {
                    message = `Field: ${field} is required in all shopping cart items`
                }
            }
        })

        if( message != "" ) {
            throw new BadRequestError(message)
        } 
    

      
        let total = 0;
        for (let i = 0; i < purchase.shoppingCart.length; i++) {
            const product = await Store.fetchProductById((purchase.shoppingCart[i])["itemId"])
            
            total += product?.price * (purchase.shoppingCart[i]).quantity * 1.0875
        }

        const purchases = await Store.listPurchases()
        const purchaseId = purchases.length + 1
        const createdAt = new Date().toISOString()


        const newPurchase = { id: purchaseId, name: purchase.user.name, email: purchase.user.email, order: purchase.shoppingCart, total, createdAt }
        storage.get("purchases").push(newPurchase).write()

        return newPurchase
    }
}

module.exports = Store