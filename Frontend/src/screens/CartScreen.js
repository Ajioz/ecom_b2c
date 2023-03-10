import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/cartAction";

const CartScreen = ({match, location, history}) => {
  window.scrollTo(0, 0);

  let getDetails = JSON.parse(localStorage.getItem("Country")) || {};

  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cartItem = useSelector((state) => state.cart);
  const { cartItems } = cartItem

  const totalPrice = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if(productId) dispatch(addToCart(productId, qty))
  }, [productId, dispatch, qty])
  
  const checkOutHandler = (e) => {
    e.preventDefault();
    history.push("/login?redirect=shipping")
  }

  const removeFromCartHandler = (id) => {
    // TODO
     dispatch(removeFromCart(id))
  }

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {
          cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
                Your cart is empty
                <Link className="btn btn-success mx-5 px-5 py-3"
                  to="/" style={{  fontSize: "12px", }} >
                  SHOPPING NOW
                </Link>
            </div>
          ):(
            <>
              <div className=" alert alert-info text-center mt-3">
                Total Cart Products
                <Link className="text-success mx-2" to="/cart">
                  ({cartItems.length})
                </Link>
              </div>

              {/* start of cartItem */}
              {
                cartItems.map((item, index) => (
                   <div className="cart-iterm row" key={index}>
                      <div 
                        onClick={()=> removeFromCartHandler(item.productId)}
                        className="remove-button d-flex justify-content-center align-items-center">
                        <i className="fas fa-times"></i>
                      </div>
                      <div className="cart-image col-md-3">
                        <img src={item.image?.url} alt={item.name} />
                      </div>
                      <div className="cart-text col-md-5 d-flex align-items-center">
                        <Link to={`/products/${item.productId}`}>
                          <h4>{item.name}</h4>
                        </Link>
                      </div>
                      <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                        <h6>{item.qty}</h6>
                        <select value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}>
                              {[...Array(item.stock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                        </select>
                      </div>
                      <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                        <h6>PRICE</h6>
                        <h4>${item.price}</h4>
                        <h5 style={{color: "gray", fontFamily:"monospace"}}>{getDetails?.code} {item.price * getDetails?.rate?.toFixed(1)} </h5>
                      </div>
                   </div>
                ))
              }
              {/* End of cartItems */}
              
              <div className="total">
                <span className="sub">total</span>
                <h5 className="total-price">USD {totalPrice}</h5>
                <h5 className="total-price" style={{color: "gray", fontFamily:"monospace", fontWeight:'200'}}>
                  {getDetails?.code} {totalPrice * getDetails?.rate?.toFixed(2)}
                </h5>
              </div>
              <hr />
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>Continue To Shopping</button>
                </Link>
                {
                  totalPrice > 0 && (
                    <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                      <button onClick={checkOutHandler}>
                          Checkout
                      </button>
                    </div>
                  )
                }
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default CartScreen;
