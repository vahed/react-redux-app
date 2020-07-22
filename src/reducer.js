import {DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTALS,TOGGLE_AMOUNT} from "./actions";
import cartItems from "./cart-items";
const initialStore = {
    cart: cartItems,
    total: 0,
    amount: 0
}
//set state to default value initialStore
function reducer(state = initialStore,action) {
    //console.log({state,action});
    if (action.type === CLEAR_CART) {
        //console.log("you clear amount");
        return {...state, cart: []};
    }
    if (action.type === DECREASE) {
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
                cartItem = {...cartItem, amount: cartItem.amount - 1};
            }
            return cartItem;
        });
        return {...state, cart: tempCart};//set cart to tempCart if empty clear the card
    }
    if (action.type === INCREASE) {
        let tempCart = state.cart.map(cartItem => {
            //console.log('increase'+cartItem);
            if (cartItem.id === action.payload.id) {
                cartItem = {...cartItem, amount: cartItem.amount + 1};
            }
            return cartItem;
        });
        return {...state, cart: tempCart};
    }
    if (action.type === REMOVE) {
        return {
            ...state,
            cart: state.cart.filter(cartItem => cartItem.id !==
                action.payload.id)//filter cartItem.id if does not match payload.id
        };
    }
    if (action.type === GET_TOTALS) {
        let {total, amount} = state.cart.reduce(
            (cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const itemTotal = price * amount;
                cartTotal.total += itemTotal;
                cartTotal.amount += amount;
                return cartTotal // in reduce we must return total amount
            },
            {
                total: 0,//initial total and amount set to 0
                amount: 0
            }
        );
        total = parseFloat(total.toFixed(2))// we will just have 2 decimals for total amount .99
        return {...state, total, amount};
    }
    if (action.type === TOGGLE_AMOUNT) {
        return {...state, cart: state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    console.log(action.payload.toggle);
                    if (action.payload.toggle === 'inc') {
                        return (cartItem = {...cartItem, amount: cartItem.amount + 1})
                    }
                    if (action.payload.toggle === 'dec') {
                        return (cartItem = {...cartItem, amount: cartItem.amount - 1})
                    }
                }
                return cartItem
            })
        }
    }
    return state;
}

export default reducer;