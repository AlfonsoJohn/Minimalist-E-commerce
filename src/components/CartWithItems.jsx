import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../pages/ProductPage";
import EmptyCart from "./EmptyCart";

function CartWithItems() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItem]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cartItem }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setCartItem([]); // Clear the cart after successful checkout
      } else {
        alert(`Checkout failed: ${data.error}`);
      }
    } catch (error) {
      alert(`Checkout failed: ${error.message}`);
    }
  };

  return (
    <>
      <div className="full-cart-div">
        <div className="full-cart">
          {cartItem.length > 0 ? (
            cartItem.map((item, id) => <CartItem key={id} item={item} />)
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
      <div className="subtotal-div">
        <div className="sub-right">
          <p>Subtotal</p>
          <p className="total-price">{totalPrice}.00$</p>
        </div>
        <div className="sub-left">
          <Link to="#" onClick={handleCheckout} className="checkout-button">
            Go to Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartWithItems;
