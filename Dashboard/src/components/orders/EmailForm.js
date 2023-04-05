import "../Subscribers/email.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";   
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../../Redux/url";

function Email({ emailz }) {

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
      let isMounted = true;
      if(isMounted){
        setEmail(emailz);
      }
      return () => isMounted = false;
  }, [setEmail, emailz])
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !subject || !message){
      return toast.error("Please make sure to fill the email address, email subject, and message");
    }
    try {
      setLoading(true);
      const config = {
        headers:{
          Authorization: `Bearer: ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`${URL}/api/send/email`, {email, subject, message}, config);
      setLoading(false);
      toast.success(data.message);
        setEmail("");
        setSubject("");
        setMessage("");
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="email">
      <section>
        <ToastContainer position="top-center" limit={1} />
        <form onSubmit={submitHandler}>
          <h1>Send Email</h1>
          <div className="form-wrapper">
           
           <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={emailz}
              ></input>
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="message">Message Body</label>
              <textarea
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button disabled={loading} type="submit">
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>

          </div>
        </form>
      </section>
    </div>
  );
}

export default Email;