import { useEffect, useState } from "react";
import image from "../assets/first-post.jpg";
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
                axios.get(api + "/api/document/user/"+localStorage.getItem("userId"), {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("token")}`
                    }
                }).then(
                    response => {
                        if (response.status == 200 || response.status == 201) {
                            console.log(response.data.documents)
                            setRes(response.data.documents)
                            setData(response.data.documents)
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
        axios.delete(api + "/api/document/" + id, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(
            res => {
                if (res.status == 200 || res.status==201) {
                    // alert("document deleted")
                    //axios.get("http://localhost:500/delete/files/" + id)
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
            axios.post(api + '/api/document', {
                user_id: localStorage.getItem("userId"),
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
            }).then(res => { if (res.status == 200 || res.status==201) { navigate("/document/" + res.data['id']) } else { alert("an error has occured") } })
        }
    }

    return (
        <div className="container">
            <blockquote>
                <p><em>edit, view and create LaTex documents online </em></p>
            </blockquote>
            <div className="c1">
                <img class="img" src={image} />
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
                                    {item._id}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <a onClick={() => handleView(item._id)}>Click</a>
                                </td>
                                <td>
                                    <a onClick={() => handleEdit(item._id)}>Click</a>
                                </td>
                                <td>
                                    <a onClick={() => handleDelete(item._id)}>Click</a>
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