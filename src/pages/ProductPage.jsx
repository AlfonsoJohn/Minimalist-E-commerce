import { createContext, useContext, useState } from "react";
import "../components/ProductPage.css";
import { items } from "../components/AllData";
import TrendingSlider from "../components/TrendingSlider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useParams } from "react-router";

export const CartContext = createContext();

function ProductPage() {
  const { id } = useParams();
  const item = items.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(item.img);

  const { addToCart } = useContext(CartContext);

  const changeImage = (e) => {
    setImage(e.target.src);
  };

  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity) => {
    return quantity * item.price;
  };

  const [notify, setNotify] = useState(false);

  const showNotify = () => {
    setNotify(!notify);
  };

  return (
    <>
      <div
        onAnimationEnd={() => setNotify(false)}
        className={`notify ${notify ? "slide-in" : ""}`}
      >
        <p>Item has been added to the cart &nbsp; ✅</p>
      </div>

      <div className="product-page-div">
        <div className="container">
          <div className="product-div">
            <h3 className="product-big-name">{item.description}</h3>
            <div className="product-left">
              <div className="big-img">
                <img src={image} alt="product" />
              </div>
              <div className="small-imgs">
                <img
                  onMouseOver={changeImage}
                  src={item.img}
                  alt="product"
                />
                <img
                  onMouseOver={changeImage}
                  src={item.otherImgs[0]}
                  alt="product"
                />
                <img
                  onMouseOver={changeImage}
                  src={item.otherImgs[1]}
                  alt="product"
                />
              </div>
            </div>
            <div className="product-right">
              <p className="product-spec">{item.specs}</p>
              <div className="product-quant">
                <p>Quantity</p>
                <div className="product-btns">
                  <button onClick={decrease}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button onClick={increase}>+</button>
                </div>
                <p className="product-price">{calcPrice(quantity)}.00$</p>
              </div>
              <div className="atc-buy">
                <button
                  onClick={() => {
                    addToCart({ ...item, quantity });
                    showNotify();
                  }}
                  className="atc-btn"
                >
                  add to cart
                </button>
                <button className="buy-btn">buy now</button>
              </div>
            </div>
          </div>

          <div className="specifications">
            <div className="spec">
              <p className="spec-title">Texture:</p>
              <p className="title-desc">{item.texture}</p>
            </div>
            <div className="spec">
              <p className="spec-title">Weight:</p>
              <p className="title-desc">{item.weight}</p>
            </div>
            <div className="spec">
              <p className="spec-title">Size:</p>
              <p className="title-desc">{item.size}</p>
            </div>
          </div>
        </div>
        <TrendingSlider />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
