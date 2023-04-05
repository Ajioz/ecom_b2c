import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {useDispatch, useSelector} from 'react-redux'
import { listProduct } from "../../Redux/Actions/ProductAction";
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import axios from "axios";
import { URL } from "../../Redux/url";

const ShopSection = (props) => {

  let getDetails = JSON.parse(localStorage.getItem("Country")) || {};

  const [details, setDetails] = useState(getDetails)
  const { keyword, pagenumber } = props;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList )
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    let isMounted = true;
    (async() => {
      if(isMounted){
        if(Object.keys(details).length > 0){
          let countryRate = details['rate'];
          let rateMonth = details['month'];
          let todayMonth = new Date().getMonth()+1;
          if(rateMonth !== todayMonth){
              const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer: ${userInfo?.token}`,
                },
              };
              let { data } = await axios.post(`${URL}/api/products/country`, {country: userInfo.country}, config);
              let month = Number(data.date.split('-')[1]);
              let rate = data.info.rate;
              let code = data.code;
              const country = { month, rate, code }
              if(countryRate !== country.rate){
                  localStorage.setItem("Country", JSON.stringify(country));
                  setDetails(country)
              }
          }else{
            console.log({ message: "System is up to date!" });
          }
        }else{
          if((userInfo) !== null){
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${userInfo?.token}`,
                    },
                  };
                let { data } = await axios.post(`${URL}/api/products/country`, {country: userInfo.country}, config);
                let date = data.date;
                let month = Number(date.split('-')[1]);
                let rate = data.info.rate;
                let code = data.code;
                const country = { month, rate, code };
                localStorage.setItem("Country", JSON.stringify(country));
                setDetails(country);
              }
          }
      }
    })();
    return () => isMounted = false;
  },[userInfo?.token, details, userInfo,  userInfo?.country])
  

  useEffect(() => {
    let isMounted = true;
    if(isMounted) dispatch(listProduct(keyword, pagenumber))
    return () => isMounted = false;
  },[dispatch, keyword, pagenumber, details])
  
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                        {products.map((product) => (
                            <div
                              className="shop col-lg-4 col-md-6 col-sm-6"
                              key={product._id}>
                              <div className="border-product">
                                <Link to={`/products/${product._id}`}>
                                  <div className="shopBack">
                                    <img src={product.image?.url} alt={product.name} />
                                  </div>
                                </Link>

                                <div className="shoptext">
                                  <p>
                                    <Link to={`/products/${product._id}`}>
                                      {product.name}
                                    </Link>
                                  </p>
                                  <Rating
                                    value={product.rating}
                                    text={ `${product.numberReview} ${product.numberReview > 1 ? "reviews" : "review"}` } />
                                  <h3>${product.price}</h3>
                                  { userInfo?.country ? (
                                    <>
                                      {
                                         details?.rate ? (
                                           <><h6 style={{color: "gray", fontFamily:"monospace"}}>{details?.code} {product.price * details?.rate?.toFixed(1)} </h6></>
                                         ) : (
                                            <cite><h6 style={{color: "gray"}}>calc...</h6></cite>
                                         )
                                      }
                                    </>
                                  ) : (
                                   <cite><h6 style={{color: "gray"}}>Appx: N{product.price * 100} </h6></cite>
                                  )
                                }
                                </div>
                              </div>
                            </div>
                          ))}
                    </>
                  )
                }
                {/* Pagination */}
                <Pagination 
                  pages={pages} 
                  page={page} 
                  keyword={keyword ? keyword : ""}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
