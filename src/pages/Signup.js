import image from "./img5.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername]= useState("");
  const api= "http://localhost:8080";
  const navigate= useNavigate();
 function submit(){
  axios.post(api+'/api/register', {
    username: username,
    password: password,
    email: email
  }).then(
    res =>{
      if (res.status==200){
       navigate("/")
      }else{
        alert("an error has occured, please try again")
      }
    }
  )
}
useEffect(()=>{
  if (localStorage.getItem("token")!= undefined ){
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
    <div className="container">
      <blockquote>
        <p><em>This application enables the user to edit and generate LaTex documents online</em> sign up now and enjoy the features</p>
      </blockquote>
      <img src={image} height="" />
      <br />
      <br />
      <h2>Sign Up</h2>
      <center>

        <div className="row"><div className="column"><input placeholder="Username" type="text" onChange={handleUsername} /></div> < div className="column"><input placeholder="email" type="email" onChange={handleEmail} /></div></div>
        <input placeholder="Password" type="password" onChange={handlePassword}/>

        <button onClick={submit} >Submit</button>
      </center>


    </div>
  )
}
export default Signup;