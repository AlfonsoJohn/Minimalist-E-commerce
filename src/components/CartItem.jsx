import { useContext, useState } from "react";
import { CartContext } from "../pages/ProductPage";
import { IconX } from "@tabler/icons-react";

function CartItem({ item }) {
  const { setCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItem((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );
  };

  const increase = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateCartItemQuantity(item.id, newQuantity);
      return newQuantity;
    });
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateCartItemQuantity(item.id, newQuantity);
        return newQuantity;
      });
    }
  };

  const removeFromCart = (id) => {
    setCartItem((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.img} alt="product" />
      </div>
      <div className="cart-middle">
        <p className="cart-name">{item.description}</p>
        <div className="cart-btns">
          <button onClick={decrease}>-</button>
          <p className="quantity">{quantity}</p>
          <button onClick={increase}>+</button>
        </div>
      </div>
      <div className="cart-right">
        <p className="cart-price">{item.price * quantity}.00$</p>
        <IconX onClick={() => removeFromCart(item.id)} />
      </div>
    </div>
  );
}

export default CartItem;

