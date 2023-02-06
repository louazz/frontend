import image from "./img.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Login() {
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate()
    const api= "http://localhost:8080"
    const submit = ()=>{
        axios.post(api+"/api/login", {
            username: username,
            password: password
        }
        ).then(
            res =>{
                if (res.status ==200){
                    localStorage.setItem("token", res.data["token"])
                    navigate("/search")
                }else{
                    alert("try logging in again, an error has occured")
                }
            }
        )
    }
    useEffect(()=>{
        if (localStorage.getItem("token")!= undefined ){
            navigate("/search")
        }
    })
    const handleUsername=(e)=>{
        setUsername(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    return (
        <div className="container">
            <blockquote>
                <p><em>This application enables the user to edit and generate LaTex documents online</em></p>
            </blockquote>
            <img src={image} />
            <br />
            <br />
            <h2>Login</h2>
            <center>
            <input placeholder="Username" onChange={handleUsername} />
<input placeholder="Password" type="password" onChange={handlePassword} />

                <button onClick={submit}>Submit</button>
            </center>
         

        </div>
    )
}
export default Login;