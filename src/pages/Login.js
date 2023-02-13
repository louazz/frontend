import image from "../assets/first-post.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const api = "http://164.92.84.141"
    const submit = () => {
        axios.post(api + "/api/login", {
            username: username,
            password: password
        }
        ).then(
            res => {
                if (res.status == 200) {
                    localStorage.setItem("token", res.data["token"])
                    navigate("/search")
                } else {
                    alert("try logging in again, an error has occured")
                }
            }
        )
    }
    useEffect(() => {
        if (localStorage.getItem("token") != undefined) {
            navigate("/search")
        }
    })
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="container">
            <blockquote>
                <p><em>This application enables the user to edit and generate LaTex documents online</em></p>
            </blockquote>
            <div className="c">
                <img src={image} />
                <h1 className="top-left">Login</h1>

            </div>
            <br />
            <h2>Login</h2>

            <label>Username</label>
            <input placeholder="Username" onChange={handleUsername} />
            <label>Password</label>
            <input placeholder="Password" type="password" onChange={handlePassword} />
            <center>
                <button onClick={submit}>Submit</button>
            </center>


        </div>
    )
}
export default Login;