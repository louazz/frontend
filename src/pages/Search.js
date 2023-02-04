import { useState } from "react";
import image from "./img4.jpg";
function Search() {
    const [data, setData] = useState([
        { id: "58s5d5f5g555565431", title: "lord of the rings" },
        { id: "58s5d5f5g555565431", title: "Foundation 1" },
        { id: "58s5d5f5g555565431", title: "Dune" },
        { id: "58s5d5f5g555565431", title: "Harry Potter 1" },
        { id: "58s5d5f5g555565431", title: "lord of the rings 2" },
        { id: "58s5d5f5g555565431", title: "lord of the rings 4" },

    ])
    const [res, setRes]= useState(data)
    const [search, setSearch] = useState("")
    const handleChange =(e)=>{

if (e.target.value==""){
setRes(data)
}else{
    setRes(data.filter(item => item.title.toLowerCase().includes(e.target.value)))
}

    }
    const match=(input)=>{
 data.filter(item => item.title.includes(input))
    }
    return (
        <div>
            <blockquote>
                <p><em>Decrypt and edit documents </em></p>
            </blockquote>
            <img src={image} />
            <br />
            <h2>documents</h2>
            <center>
                <div className="row"><div className="column">
                    <input placeholder="Search for document..." onChange={handleChange}  />
                </div>
                    <div className="column"><button className="float-left">search</button></div>
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
                                    {item.id}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <a>Click</a>
                                </td>
                                <td>
                                    <a>Click</a>
                                </td>
                                <td>
                                    <a>Click</a>
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