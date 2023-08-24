import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  //Subject is used to publish events in our code and the event is sent to all subscribers
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  addToCart(theCartItem: CartItem) {
    
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if(this.cartItems.length > 0){
      
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);

    }

    alreadyExistsInCart = (existingCartItem != undefined);
    if(alreadyExistsInCart)
    existingCartItem.quantity++;
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();    

  }

  removeFromCart(theCartItem: CartItem) {
      theCartItem.quantity--;
      if(theCartItem.quantity==0){
        this.remove(theCartItem);
      }
      else{
        this.computeCartTotals();
      }
  }
  remove(theCartItem: CartItem){
      const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id == theCartItem.id);
      if(itemIndex > -1){
        this.cartItems.splice(itemIndex,1);
        this.computeCartTotals();
      }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for(let tempCartItem of this.cartItems){
      totalPriceValue += tempCartItem.quantity*tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue,totalQuantityValue);
    this.persistCartItems();

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`totalPriceValue: ${totalPriceValue}`);
    console.log(`totalQuantityValue: ${totalQuantityValue}`);
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if(data !=null){
      this.cartItems = data;
      this.computeCartTotals();
    }
  }
}
