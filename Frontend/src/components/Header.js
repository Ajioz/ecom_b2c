import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { logout } from "../Redux/Actions/userActions";


const Header = () => {

  const dispatch = useDispatch();
  const [keyword, setkeyWord] = useState("");
  let history = useHistory()

  const cartItem = useSelector((state) => state.cart);
  const { cartItems } = cartItem;
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandle = (e) => {
    dispatch(logout()); 
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/search/${keyword}`);
    }else{
      history.push('/');
    }
  } 

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement" style={{background:'#0277bd'}}> 
        <div className="container">
          <div className="row">

            {/* Quick Reach */}
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+234-907 095 3512</p>
              <p>info@hubsandy.com</p>
            </div>

            {/* Social Media */}
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <a href="https://www.facebook.com/profile.php?id=100090154294939&mibextid=ZbWKwL" target="_blank"  rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/hubsandy?igshid=ZDdkNTZiNTM=" target="_blank"  rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100090154294939&mibextid=ZbWKwL" target="_blank"  rel="noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a> 
              <a href="whatsapp://send?text=Hi hubSandy, I'd love to order some product, I thought of reaching out first!&phone=+2349070953512" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.youtube.com/@sandyhub-Collections" target="_blank"  rel="noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              {
                userInfo?.isAdmin && (
                  <a href="https://sandyboard.netlify.app/" target="_blank"  rel="noreferrer">
                    <button type="button"  class="btn btn-outline-info">Admin</button>
                  </a>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo ? (
                        <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fas fa-user"></i>
                          </button>
                          
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/profile"  >
                              Profile
                            </Link>

                            <Link className="dropdown-item" to="#" 
                              onClick={logoutHandle}>
                              Logout
                            </Link>
                          </div>
                        </div>
                    ) : (
                       <div className="btn-group">
                          <button
                            type="button"
                            className="name-button dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fas fa-user"></i>
                          </button>
                          
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/login">
                              Login
                            </Link>

                            <Link className="dropdown-item" to="/register" >
                              Register
                            </Link>
                          </div>
                        </div>
                    )
                  }
                  <a href="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </a>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler}  className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setkeyWord(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setkeyWord(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo ? (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                         Hi, {userInfo?.name}
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>
                          <Link className="dropdown-item" to="#"
                            onClick={logoutHandle}>
                            Logout
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        <a href="/register"> Register </a>
                        <a href="/login"> Login </a>
                      </>
                    )
                  }

                <a href="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
