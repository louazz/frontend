import { useEffect, useState } from "react";
import image from "../assets/first-post.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Search() {
    const [data, setData] = useState([
    ])
    const [res, setRes] = useState(data)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [checker, setChecker] = useState(false);
    const api = "https://backend.encrylatex.live"
    useEffect(() => {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
            navigate("/login")
        } else {
            if (checker == false) {
                axios.get(api + "/api/docs", {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("token")}`
                    }
                }).then(
                    response => {
                        if (response.status == 200) {
                            setRes(response.data)
                            setData(response.data)
                            setChecker(true)
                        } else {
                            localStorage.clear()
                            toast("An error has occured, please try to refresh the page")
                        }
                    }
                )
            }
        }
    })

    //handle delete
    const handleDelete = (id) => {
        axios.delete(api + "/api/doc/" + id, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(
            res => {
                if (res.status == 200) {
                    // alert("document deleted")
                    axios.get("http://localhost:500/delete/files/" + id)
                    setChecker(false)
                } else if (res.status == 400) { localStorage.clear() }
                else {
                    toast("internal server error")
                }
            }
        )
    }
    // view doc
    const handleView = (id) => {
        navigate("/view/" + id)
    }
    const handleEdit = (id) => {
        navigate("/document/" + id)
    }

    //new document
    const handleChange = (e) => {

        if (e.target.value == "") {
            setRes(data)
        } else {
            setRes(data.filter(item => item.title.toLowerCase().includes(e.target.value)))
        }

    }
    const handleNew = () => {
        var title = window.prompt("insert a title");
        if (title != "") {
            axios.post(api + '/api/doc', {
                title: title,
                content: `\n\\documentclass[11pt]{article}
                \n\\usepackage{lipsum} 
               \n\\title{ Title}
                \n\\author{ Author }
                \n\\date{\today}
                \n\\begin{document}
                \n\\maketitle	
                \n\\lipsum[2-10]
                \n\\section{Section 1}
                \n\\lipsum[2-10]
                \n\\pagebreak
                \n\\end{document}`
            }, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(res => { if (res.status == 200) { navigate("/document/" + res.data['doc']['ID']) } else { alert("an error has occured") } })
        }
    }

    return (
        <div className="container">
            <blockquote>
                <p><em>edit, view and create LaTex documents online </em></p>
            </blockquote>
            <div className="c">
                <img src={image} />
                <div className="top-left">
                    <h1 >Search for a document</h1>

                    <h4>View , edit, compile, and export LaTex</h4>

                </div>
            </div>
            <br />

            <h2>documents</h2>
            <center>
                <div className="row"><div className="column column-60">
                    <input className="float-right" placeholder="Search for document..." onChange={handleChange} />
                </div>
                    <div className="column"><button className="button  float-left" onClick={handleNew}>New Document +</button></div>
                </div>

                <br />
                <table>
                    <thead><tr>
                        <th>
                            doc_id
                        </th>
                        <th>
                            title
                        </th>
                        <th>
                            view
                        </th>
                        <th>
                            edit
                        </th>
                        <th>
                            delete
                        </th>
                    </tr></thead>
                    <tbody>
                        {res.map(item => (
                            <tr>
                                <td>
                                    {item.ID}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <a onClick={() => handleView(item.ID)}>Click</a>
                                </td>
                                <td>
                                    <a onClick={() => handleEdit(item.ID)}>Click</a>
                                </td>
                                <td>
                                    <a onClick={() => handleDelete(item.ID)}>Click</a>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </center>
            <ToastContainer
                position="top-right"
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
export default Search;