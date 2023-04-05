import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/Actions/userActions";
import Toast from '../LoadingError/Toast'
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null)

  const ToastParams = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover:false,
    autoClose:2000
  }

  const dispatch = useDispatch();

  const userDetail = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetail;

  const userUpdate = useSelector(state => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdate;

  useEffect(() => {
      let isMounted = true;
      if(isMounted){
          if(user){
            setName(user.name)
            setEmail(user.email)
          }
      }
      return () => isMounted = false;
  }, [setName, setEmail, user])
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if(password !== confirmPassword){
          if(!toast.isActive(toastId.current)) toastId.current = toast.error("Password does not match", ToastParams)
      }else{
          dispatch(updateProfile({_id:user._id, name, email, password}));
          if(!toast.isActive(toastId.current)) toastId.current = toast.success("Profile Updated", ToastParams)
      }
  }
  
  return (
    <>
      <Toast />
      {error && <Message variant={"alert-danger"}>{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input className="form-control" 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input className="form-control" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">New Password</label>
            <input className="form-control" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Confirm Password</label>
            <input className="form-control" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        </div>


        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
