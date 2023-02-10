import { useNavigate, useParams } from "react-router";
import Doc from "../components/Doc.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
function View() {
    let { id } = useParams();
    const [content, setContent]= useState("")
    const [checker, setChecker]= useState(false)
    const [seed, setSeed] = useState(1)
    const [fileUrl, setFileUrl]=useState(null)
    const api= "http://localhost:8080"
    const api_comp= "http://localhost:5000"
    let navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/login")
        } else {
            if (checker == false) {
                axios.get(api + "/api/doc/" + id, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    if (res.status == 200) {
                        console.log(res.data["document"]["content"])
                        setContent(res.data["document"]["content"]);
                        let formData = new FormData()
                        formData.append('file', content)
                        axios.post(api_comp + "/compile/pdf/" + id, formData, {
                            responseType: "arraybuffer",
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then(res => {
                            var file = new Blob([res.data])
                            var fileUrl = URL.createObjectURL(file);
                            setFileUrl(fileUrl)
                            setSeed(Math.random())
                            setChecker(true);
                        

                        })
                    } else { alert("server error") }
                })

            }
        }
    })
    return (
        <div class="container">
 {fileUrl!=null? <Doc fileUrl={fileUrl} key={seed} />: <></>}
        </div>
    )
}
export default View;