import image from "../assets/first-post.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const api = "https://back.encrylatex.live";
  const navigate = useNavigate();
  function submit() {
    axios.post(api + '/api/signup', {
      username: username,
      password: password,
      email: email
    }).then(
      res => {
        if (res.status == 201) {
          toast('registration succeeded')
          navigate("/login")
        } else {
          toast("an error has occured, please try again")
        }
      }
    ).catch(function (error) {
      toast('internal server error')
    })
  }
  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      navigate("/search")
    }
  })
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  return (
    <>
    <div className="container">
      <blockquote>
        <p><em>This application enables the user to edit and generate LaTex documents online</em> sign up now and enjoy the features</p>
      </blockquote>

      <div className="c">
        <img className="img" src={image} height="" />
        <h1 className="top-left">Sign Up</h1>

      </div>
      <br />
      </div>
            <br />
            <div className="container fourth-color">
      <h2>Sign Up</h2>


      <div className="row"><div className="column"><label>Username</label><input placeholder="Username" type="text" onChange={handleUsername} /></div> < div className="column"><label>Email</label><input placeholder="email" type="email" onChange={handleEmail} /></div></div>
      <label>Password</label>  <input placeholder="Password" type="password" onChange={handlePassword} />
      <center>
        <button   className="button" onClick={submit} >Submit</button>
      </center>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div></>
  )
}
export default Signup;