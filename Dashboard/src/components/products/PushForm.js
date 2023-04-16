import React, {  useState } from 'react';
import { useSelector } from "react-redux";  
import styled from 'styled-components';
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { URL } from "../../Redux/url";


const toastParam = {
    pauseOnFocusLoss : false,
    draggable: false,
    pauseOnHover:false,
    autoClose:2000
}

const PushForm = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [values, setValues] = useState({
        title: "",
        body: ""
    });

    const toastId = React.useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
                const config = {
                headers:{
                    Authorization: `Bearer: ${userInfo?.token}`,
                },
            };
            const { title, body } = values;
            const { data } = await axios.post(`${URL}/api/notifications/send`, {title, body}, config);
            if(data.status === false){
                if(!toast.isActive(toastId.current)) toastId.current = toast.error(data.msg, toastParam); 
            }
            if(data.status ===true ) {
                toast.success(data.status, toastParam);
                setValues({
                    title: "",
                    body: ""
                })
            }
        } catch (error) {
            toast.error(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            );
        }
    }
    
    const handleChange =(e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <p>send loyalty</p>

                    <input 
                    type="text" 
                    placeholder='Title' 
                    name='title'
                    required
                    autoFocus
                    onChange={(e) => handleChange(e)}/>
                
                    <textarea 
                    placeholder='create notification...' 
                    name='body'
                    required
                    cols="20" rows="4"
                    onChange={(e) => handleChange(e)}/>

                    <button type='submit'>push</button>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
    }

export default PushForm;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 360px;
    margin: 0 auto;
    form{
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        align-items: center;
        gap: 1rem;
        border-radius: 2rem;
        width: 80%;
        padding: 10px;
        p{
          font-size: 18px;
          text-transform:uppercase;
          border: 1px solid #eee;
          margin: 0;
          padding: 10px 20px;
          background-color: #eee;
          border-radius: 20px;
          font-weight: 700;
        }
        input{
          background-color: transparent;
          padding: 1rem;
          border: 0.1rem solid #4e0eff;
          border-radius: 0.4rem;
          color: #333;
          width: 100%;
          width: 28ch;
          font-size: 1rem;
          &:focus{
              border: .1rem solid #997af0;
              outline: none;
          }
        }
        textarea{
          width: 28ch;
          overflow: auto;
          padding: 1rem;
          border: 0.1rem solid #4e0eff;
          border-radius: 0.4rem;
        }
        button{
            background-color: darkcyan;
            color: white;
            padding: .6rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: skyblue;
            }
        }
    }
`;