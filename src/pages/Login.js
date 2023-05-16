import image from "../assets/first-post.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const api = "https://backend.encrylatex.live"
    const submit = () => {
        axios.post(api + "/api/signin", {
            username: username,
            password: password
        }
        ).then(
            res => {


                if (res.status == 200 || res.status==201 || res.status==201) {
                    localStorage.setItem("userId",  res.data["userId"])
                    localStorage.setItem("token", res.data["token"])
                    navigate("/search")
                } else {

                    toast("try logging in again, an error has occured")
                }
            }
        ).catch(
            function (error) {
                toast("internal server error")
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
                <img className="img" src={image} />
                <h1 className="top-left">Login</h1>

            </div>
            <br />
            <h2>Login</h2>

            <label>Username</label>
            <input placeholder="Username" onChange={handleUsername} />
            <label>Password</label>
            <input placeholder="Password" type="password" onChange={handlePassword} />
            <center>
                <button className="button" onClick={submit}>Submit</button>
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

        </div>
    )
}
export default Login;