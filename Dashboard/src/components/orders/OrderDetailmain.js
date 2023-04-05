import React, { useEffect, useState } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrderDetail } from "../../Redux/Actions/orderAction";
import  Loading  from '../LoadingError/Loading'
import  Message  from '../LoadingError/Error'
import moment from 'moment'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Email from "./EmailForm";



const OrderDetailmain = ({orderId}) => {
  const [email, setEmail] = useState("")
  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => {
    setEmail(order.user.email);
    setTopRightModal(!topRightModal);
  };

  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const {loading, error, order } = orderDetail;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const {loading:loadingDelivered, success } = orderDelivered;


  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      dispatch(getOrderDetail(orderId))
    }
    return () => isMounted = false;
  }, [dispatch, orderId, success])
  
  const deliverHandler = (e) => {
    dispatch(deliverOrder(order))
  }

  return (
    <>   
      <section className="content-main">
        <div className="content-header">
          <Link to="/orders" className="btn btn-dark text-white">
            Back To Orders
          </Link>
          <MDBBtn onClick={toggleShow} >Send eMail</MDBBtn>
        </div>
        {
          loading ? <Loading /> 
          : error ? <Message variant="alert-danger">{error}</Message>
          :(
              <div className="card">
              <header className="card-header p-3 Header-green">
                <div className="row align-items-center ">
                  <div className="col-lg-6 col-md-6">
                    <span>
                      <i className="far fa-calendar-alt mx-2"></i>
                      <b className="text-white">{moment(order.createdAt).format("llll")}</b>
                    </span>
                    <br />
                    <small className="text-white mx-3 ">
                      Order ID: {order._id}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                    <select className="form-select d-inline-block"  style={{ maxWidth: "200px" }}>
                      <option>Change status</option>
                      <option>Awaiting payment</option>
                      <option>Confirmed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                    <Link className="btn btn-success ms-2" to="#">
                      <i className="fas fa-print"></i>
                    </Link>
                  </div>
                </div>
              </header>
              <div className="card-body">
                {/* Order info */}
                <OrderDetailInfo order={order}/>
                <div className="row">
                  <div className="col-lg-9">
                    <div className="table-responsive">
                      <OrderDetailProducts order={order} loading={loading} />
                    </div>
                  </div>
                  {/* Payment Info */}
                  <div className="col-lg-3">
                    <div className="box shadow-sm bg-light">
                      {
                        order.isDelivered ? (
                          <button className="btn btn-success col-12">
                            DELIVERED AT {" "}{moment(order.deliveredAt).format("MMM Do YY")}
                          </button>
                        ) : (
                          <>
                            { loadingDelivered && <Loading /> }
                            <button className="btn btn-dark col-12" onClick={deliverHandler}>
                              MARK AS DELIVERED
                            </button>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </section>
       {/* <!-- Modal --> */}
        <MDBModal
          animationDirection='right'
          show={topRightModal}
          tabIndex='-1'
          setShow={setTopRightModal}>
          <MDBModalDialog position='top-right' side>
            <MDBModalContent>
              <MDBModalHeader className='bg-info text-white'>
                <MDBBtn
                  color='none'
                  className='btn-close btn-close-white'
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <Email emailz={email}/>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn outline color='info' onClick={toggleShow}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
    </>
  );
};

export default OrderDetailmain;
