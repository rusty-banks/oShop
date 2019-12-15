import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = []; // Since we're using the push method, initializing to an empty array to avoid null exception error

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
        itemsMap = itemsMap || {};

        // tslint:disable-next-line: forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, key: productId })); // Objects that we get from firebase, so we map to shopping-cart-item object
        }
    }

    getQuantity(product: Product) {
        if (!this.itemsMap) // This is required here(was not added by Mosh) to prevent null ref error when the product card componenet
            return 0;       // checks the quantity of every item and renders the big 'Add to cart' button or the qty in the cart

        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
      }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.itemsMap)
            count += this.itemsMap[productId].quantity;

        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (const productId in this.items)
            sum += this.items[productId].totalPrice;

        return sum;
    }
}
