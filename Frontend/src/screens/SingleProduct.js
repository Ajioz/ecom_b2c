import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from '../components/LoadingError/Toast'
import moment from 'moment'
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import Loading from '../components/LoadingError/Loading'
import Message from '../components/LoadingError/Error'
import { createProductReview, ProductDetails } from "../Redux/Actions/ProductAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";

const SingleProduct = ({history,  match }) => {
  
  let getDetails = JSON.parse(localStorage.getItem("Country")) || {};
  
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(" ");


  const toastId = React.useRef(null);

  const ToastParams = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover:false,
    autoClose:2000
  }


  const dispatch = useDispatch();
  const productId = match.params.id;

 
  const detailProduct = useSelector((state) => state.detailProduct);
  const { loading, error, product } = detailProduct;
    
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { 
    loading: loadingCreateReview, 
    error:errorCreateReview, 
    success:successCreateReview 
  } = productReviewCreate;

  
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
        if(successCreateReview){
            setRating(0);
            setComment("");
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        }
        dispatch(ProductDetails(productId));
    }
    return () => isMounted = false;
  },[dispatch, productId, successCreateReview])

  const addToCartHandler = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, {
      rating,
      comment
    }));
    if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Review Submitted", ToastParams);
    }
  }

  return (
    <>
      <Header />
      <Toast />
      <div className="container single-product">
        {
          loading ? (
            <Loading />
          ): error ? (
            <Message variant="alert-danger">{error}</Message>
          ):(
            <>
              <div className="row">
                  <div className="col-md-6">
                    <div className="single-image">
                      <img src={product.image?.url} alt={product?.name} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-dtl">
                      <div className="product-info">
                        <div className="product-name">{product?.name}</div>
                      </div>
                      <p>{product?.description}</p>

                      <div className="product-count col-lg-7 ">
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Price</h6>
                          <span>${product?.price}</span>
                          <span style={{color: "gray", fontFamily:"monospace"}}>{getDetails?.code} {product.price * getDetails?.rate?.toFixed(1)} </span>
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Status</h6>
                          {product?.stock > 0 ? (
                            <span>In Stock</span>
                          ) : (
                            <span>unavailable</span>
                          )}
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Reviews</h6>
                          <Rating
                            value={product?.rating}
                            text={`${product?.numberReview} ${product.numberReview > 1 ? "reviews" : "review"}`}
                          />
                        </div>
                        {/*  */}
                        {product?.stock > 0 ? (
                          <>
                            <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>Quantity</h6>
                              <select value={qty}
                              onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.stock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <button onClick={addToCartHandler} className="round-black-btn">Add To Cart</button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RATING */}
                <div className="row my-5">
                  <div className="col-md-6">
                    <h6 className="mb-3">REVIEWS</h6>
                    {
                      product.reviews.length ===0 && (
                        <Message variant={"alert-info mt-3"}>No Reviews</Message>
                      )
                    }
                    {
                      product.reviews.map((review) => (
                        <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded" key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating}/>
                          <span>{moment(review.createdAt).calendar()}</span>
                          <div className="alert alert-info mt-3">
                            {review.comment}
                          </div>
                      </div>
                      ))
                    }
                  </div>
                  <div className="col-md-6">
                    <h6>WRITE A CUSTOMER REVIEW</h6>
                    <div className="my-4">
                      {loadingCreateReview && <Loading/>}
                      {errorCreateReview && (
                        <Message variant={"alert-danger"}>{errorCreateReview}</Message>
                      )}
                    </div>
                    {
                      userInfo ? (
                        <form onSubmit={submitHandler}>
                          <div className="my-4">
                            <strong>Rating</strong>
                            <select value={rating} onChange={(e) => setRating(e.target.value)} className="col-12 bg-light p-3 mt-2 border-0 rounded">
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </select>
                          </div>
                          <div className="my-4">
                            <strong>Comment</strong>
                            <textarea
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="col-12 bg-light p-3 mt-2 border-0 rounded"
                            ></textarea>
                          </div>
                          <div className="my-3">
                            <button disabled={loadingCreateReview} className="col-12 bg-black border-0 p-3 rounded text-white">
                              SUBMIT
                            </button>
                          </div>
                        </form>
                      ):(
                          <div className="my-3">
                            <Message variant={"alert-warning"}>
                              Please{" "}
                              <Link to="/login">
                                " <strong>Login</strong> "
                              </Link>{" "}
                              to write a review{" "}
                            </Message>
                          </div>
                      )
                    }
                  </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default SingleProduct;
