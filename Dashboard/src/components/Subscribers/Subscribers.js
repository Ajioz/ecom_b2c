import React, { useEffect, useState } from "react";
import SubcriberInfo from "./SubcriberInfo";
import { useSelector } from "react-redux";   
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
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
import { URL } from "../../Redux/url";

const Subscribers = () => {

  const [topRightModal, setTopRightModal] = useState(false);
  const toggleShow = () => setTopRightModal(!topRightModal);

  const orderList = useSelector(state => state.orderList);
  const { loading, error } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async() => {
        const config = {
            headers:{
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`${URL}/api/subscribers`, config);
        if(isMounted)  setSubscribers(data);
    })();
    return () => isMounted = false;
  }, [userInfo.token])
  

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h4 className="content-title">Subscribers</h4>
          {/* <button type="button" className="btn btn-primary">Send eMail</button> */}
          <MDBBtn onClick={toggleShow} >Send eMail</MDBBtn>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              {
                loading ?( <Loading /> 
                ) : error ? (
                <Message variant="alert-danger">{error}</Message>
                ):(
                  <SubcriberInfo subscribers={subscribers}/>
                )}
            </div>
          </div>
        </div>
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
                <Email />
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

export default Subscribers;
