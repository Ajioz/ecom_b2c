import React, { useEffect, useState } from "react";
import SubcriberInfo from "./SubcriberInfo";
import { useDispatch, useSelector } from "react-redux";   
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";

const Subscribers = () => {

  const orderList = useSelector(state => state.orderList);
  const { loading, error } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const getSubscribers = async() => {
        const config = {
            headers:{
                Authorization: `Bearer: ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('http://localhost:5001/api/subscribers', config);
        setSubscribers(data);
    }
    getSubscribers();
  }, [userInfo.token])
  

  return (
    <section className="content-main">
      <div className="content-header">
        <h4 className="content-title">Subscribers</h4>
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
  );
};

export default Subscribers;
