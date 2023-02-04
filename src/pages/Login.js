import image from "./img.jpg"
function Login() {
    return (
        <div >
            <blockquote>
                <p><em>This application enables the user to edit and generate LaTex documents online</em></p>
            </blockquote>
            <img src={image} />
            <br />
            <br />
            <h2>Login</h2>
            <center>
            <input placeholder="Username" />
<input placeholder="Password" type="password" />

                <button >Submit</button>
            </center>
         

        </div>
    )
}
export default Login;