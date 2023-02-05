import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
function Nav() {
    const [logged, setlogged] = useState(false)
  // const [isLoading, setIsLoading]= useState(false)
    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="column"><h4>Encry=||=LaTex</h4></div>
                {logged == false ? <div className="column"><button className="button button-outline float-right"><Link to="/signup">Signup</Link></button><button className="button button-clear float-right"><Link to="/">Login</Link> </button></div> : <div className="column"><button className="button button-outline float-right">logout</button></div>

                }    </div>
            <Outlet />
            <blockquote>
                <p><em>@CopyRights Louai Zaiter 2023</em></p>
            </blockquote>
        </div>
    )
}
export default Nav;