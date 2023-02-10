import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { useNavigate } from "react-router";
function Nav() {
    const [logged, setlogged] = useState(false)
    const navigate = useNavigate()
    // const [isLoading, setIsLoading]= useState(false)
    useEffect(()=>{
        if (localStorage.getItem("token")==null || localStorage.getItem("token")== undefined){
            setlogged(false)
        }else{
            setlogged(true)
        }
    })
    const logout =()=>{
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="column"><h4 onClick={()=> {navigate("/search")}}>Encry=||=LaTex</h4></div>
                    {logged == false ? <div className="column"><button className="button button-outline float-right"><Link to="/signup">Signup</Link></button><button className="button button-clear float-right"><Link to="/">Login</Link> </button></div> : <div className="column"><button className="button button-outline float-right" onClick={logout}>logout</button></div>

                    }    </div>
            </div>
            <Outlet />
            <div className="container">
            <blockquote>
                <p><em>@CopyRights Louai Zaiter 2023</em></p>
            </blockquote>
            </div>
        </>
    )
}
export default Nav;