import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRouter from "./ProvateRouter";
import Loading from "./components/LoadingError/Loading";
// import firebase from './firebase'

const HomeScreen = lazy(() => import ("./screens/HomeScreen"));
const SingleProduct = lazy(() => import ("./screens/SingleProduct"));
const Login = lazy(() => import ( "./screens/Login"));
const Register = lazy(() => import ( "./screens/Register"));
const CartScreen = lazy(() => import ( "./screens/CartScreen"));
const ShippingScreen = lazy(() => import ( "./screens/ShippingScreen"));
const ProfileScreen = lazy(() => import ( "./screens/ProfileScreen"));
const PaymentScreen = lazy(() => import ( "./screens/PaymentScreen"));
const PlaceOrderScreen = lazy(() => import ( "./screens/PlaceOrderScreen"));
const OrderScreen = lazy(() => import ( "./screens/OrderScreen"));
const NotFound = lazy(() => import ("./screens/NotFound"));


const App = () => {

//  useEffect(() => {
//     const msg = firebase.messaging();
//     msg.requestPermission().then(()=>{
//       return msg.getToken();
//     }).then((data)=>{
//       console.warn("token",data)
//     })
//   })

  return (
    <Router>
      <Suspense fallback= { <Loading />} >
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pagenumber" component={HomeScreen} exact />

          <Route 
            path="/search/:keyword/page/:pageNumber" 
            component={HomeScreen} 
            exact />
            
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRouter path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <PrivateRouter path="/shipping" component={ShippingScreen} />
          <PrivateRouter path="/payment" component={PaymentScreen} />
          <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
