import "./email.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";   
import axios from "axios";
import { URL } from "../../Redux/url";

function Email() {
  
  const [email, setEmail] = useState("subscribers@emails");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = async (e) => {
      e.preventDefault();
      if (!email || !subject || !message)
        return toast.error(
          "Please make sure to fill the email address, email subject, and message"
        );
      try {
        setLoading(true);
        const config = {
          headers:{
            Authorization: `Bearer: ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(`${URL}/api/send/emails`, {email, subject, message}, config);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                disabled
              ></input>
            </div>
            <div>
              <label htmlFor="subject">Email Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                id="subject"
              ></input>
            </div>
            <div>
              <label htmlFor="message">Message Body</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                id="message"
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