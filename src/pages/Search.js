import { useEffect, useState } from "react";
import image from "../assets/first-post.png";
import axios from "axios";
import { useNavigate } from "react-router";
function Search() {
    const [data, setData] = useState([
        { ID: "58s5d5f5g555565431", title: "lord of the rings" },
        { ID: "58s5d5f5g555565431", title: "Foundation 1" },
        { ID: "58s5d5f5g555565431", title: "Dune" },
        { ID: "58s5d5f5g555565431", title: "Harry Potter 1" },
        { ID: "58s5d5f5g555565431", title: "lord of the rings 2" },
        { ID: "58s5d5f5g555565431", title: "lord of the rings 4" },

    ])
    const [res, setRes] = useState(data)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [checker, setChecker] = useState(false);
    const api = "http://localhost:8080"
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
                            alert("An error has occured, please try to refresh the page")
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
                    setChecker(false)
                } else if (res.status == 400) { localStorage.clear() }
                else {
                    alert("internal server error")
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
               \n\\title{ Title}
                \n\\author{ Author }
                \n\\date{\today}
                \n\\begin{document}
                \n\\maketitle	
                \n\\pagebreak
                \n\\section{Section 1}
                Lorem Impsum
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
            <img src={image} />
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
        </div>
    )
}
export default Search;