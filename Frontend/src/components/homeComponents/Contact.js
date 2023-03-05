import React, { useState } from 'react'
import axios from "axios";
import { URL } from "../../Redux/url";
export const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const contactHandler = async(e) => {
        e.preventDefault();
        const config = {
            headers:{
            'Content-Type': 'application/json',
            },
        };
        await axios.post(`${URL}/api/send/contact`, {name, email, message, isChecked}, config);
        setName("");
        setEmail("");
        setMessage("");
        setIsChecked("");
    }

  return (
    <>   
        <div className="modal-body p-4">
            <form onSubmit={contactHandler}>
                {/* <!-- Name input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name4">Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="name4" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor='email4'>Email address</label>
                    <input 
                        type="email" 
                        id="email4" 
                        className="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </div>

                {/* <!-- textarea input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="textarea4">Your message</label>
                    <textarea 
                        id="textarea4" rows="4" 
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* <!-- Checkbox --> */}
                <div className="form-check d-flex justify-content-center mb-4">
                    <input 
                        className="form-check-input me-2" 
                        type="checkbox" 
                        id="checkbox4" 
                        value={isChecked}
                        onChange={(e) => setIsChecked(!isChecked)}
                    />
                    <label className="form-check-label" for="checkbox4">Send me a copy of this message</label>
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block">Send</button>
            </form>
        </div>
    </>
)}
