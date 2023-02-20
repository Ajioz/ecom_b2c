import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartAction";
import countryCode from './CountryCodes.json';



const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const getCode = (json) => {
    let codeList =[];
    let countryList =[];
    let dialCode;
    let country;
    json.map((countryCode) => {
      for(let code in countryCode){
          dialCode = countryCode['dial_code'];
          country = countryCode['name']
        }
        codeList.push(dialCode);
        countryList.push(country);
    });
    return {countryList, codeList};
  }

  const {countryList, codeList} = getCode(countryCode);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
  const [code, setCode] = useState(234)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country, code, phoneNumber}));
    history.push("/payment")
  };
  
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input type="text" 
            placeholder="Enter address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}/>

          <input type="text" 
            placeholder="Enter city"
            value={city} 
            onChange={(e) => setCity(e.target.value)} />

          <input type="text" 
            placeholder="Enter postal code"
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)}/>

          <input type="text" 
            placeholder="Enter country" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}/>

           <div className="cart-qty col-md-12 col-sm-5 mt-md-5 mt-12 mt-md-0 d-flex flex-column justify-content-center">
              <select value={code}
                onChange={(e) => setCode(e.target.value)}>
                  {codeList.map((code, index) => (
                    <option key={index} value={`${countryList[index]} ${code}`}>
                      {`${countryList[index]} ${code}`}
                    </option>
                  ))}
              </select>
            </div>
            <input type="text" 
              placeholder="Enter phone number" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}/>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
