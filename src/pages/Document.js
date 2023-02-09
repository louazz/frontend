import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "../App.css"
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc.tsx"
import Sample from '../assets/sample.pdf'
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import FileSaver from "file-saver";
function Document() {
    const [fileUrl, setFileUrl] = useState(Sample);
    const [content, setContent] = useState();
    const [checker, setChecker] = useState(false);
    const [seed, setSeed] = useState(1)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    let api = "http://localhost:8080"
    let api_comp = "http://localhost:5000"
    let { id } = useParams();
    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/")
        } else {
            if (checker == false) {
                axios.get(api + "/api/doc/" + id, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    if (res.status == 200) {
                        console.log(res.data["document"]["content"])
                        setContent(res.data["document"]["content"]); setTitle(res.data["document"]["title"]); 
                        setChecker(true);
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

                        })
                    } else { alert("server error") }
                })

            }
        }
    })
    function onChange(newValue) {
        setContent(newValue)
    }
    const Compile = () => {

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
            if (res.status == 200) {
                axios.post(
                    api + "/api/doc/" + id,
                    {
                        "title": title,
                        "content": content
                    }, {
                        headers: {
                            "Authorization": `Token ${localStorage.getItem("token")}`
                        }}
                ).then(res=> {if (res.status==200){console.log(res.status)}else{ alert("LaTex code compiled but not saved")}})
            }else{
               alert("internal server error")
            }
        })
    }
    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }
    const Docx = () => {
        let formData = new FormData();
        formData.append('file', content)
        axios.post(
            api_comp + "/compile/docx/" + id, formData, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
        ).then((res) => {
            var file = new Blob([res.data])
            FileSaver.saveAs(file, `document_${id}.docx`)
        }).catch(function () {
            alert("check your latex code")
        })
    }
    const download= () =>{
        if (fileUrl != null){
            window.open(fileUrl)
        }
    } 
    return (
        <>

            <div className="row" >
                <div className="column">
                    <div className="row">
                        <div className="column">
                            <button className="button button-black button-clear float-left" onClick={Compile}>Run</button>

                            <button className="button button-black button-outline" onClick={download}>PDF</button>

                        </div>
                        <div className="column"><input placeholder="Title of the document" onChange={handleTitle} value={title} /></div>
                        <div className="column">

                            <button className="button button-black button-outline float-right " onClick={Docx}>docx</button>
                        </div>
                    </div>

                    <AceEditor
                        mode="latex"
                        theme="solarized_light"
                        onChange={onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        height="1010px"
                        width="100%"
                        value={content}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        enableSnippets={true}
                    />
                </div>
                <div className="column">
                    <Doc fileUrl={fileUrl} key={seed} />
                </div>
            </div>


        </>
    )
}
export default Document;