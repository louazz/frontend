import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "../App.css"
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc.tsx"
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import FileSaver from "file-saver";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Document() {
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState(null);
    const [content, setContent] = useState();
    const [checker, setChecker] = useState(false);
    const [seed, setSeed] = useState(1)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    let api = "https://back.encrylatex.live"
    let { id } = useParams();
    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/login")
        } else {
            if (checker == false) {
                axios.get(api + "/api/document/" + id, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    if (res.status == 200 || res.status==201) {
                        console.log(res.data["document"]["content"])
                        setContent(res.data["document"]["content"]); setTitle(res.data["document"]["title"]);

                        let formData = new FormData()
                        formData.append('file', content)
                        axios.get(api + "/api/document/compile/" + id, {
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
                    } else { localStorage.clear(); toast("server error") }
                })

            }
        }
    })
    function onChange(newValue) {
        setContent(newValue)
    }
    const handleUpload = (e) => {
        setFile(e.target.files[0])
        const formData = new FormData();
        formData.append('key', file);
        axios
            .post(
                api + "/api/document/upload/" + id,
                formData,
                {
                    responseType: "arraybuffer",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                if (response.status == 200 || response.status == 201 || response.status == 201 || response.status == 201) {
                    toast("file uploaded")
                }

            })
            .catch(function () {
                toast("check your file")
            })
    }
    const Compile = () => {
        axios.patch(
            api + "/api/document/" + id,
            {
                "title": title,
                "content": content
            }, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }
        ).then(res => { if (res.status == 200 || res.status==201) { console.log(res.status) } else { toast("LaTex code compiled but not saved") } })
   
        axios.get(api + "/api/document/compile/" + id, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            var file = new Blob([res.data])
            var fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl)
            setSeed(Math.random())
            if (res.status == 200 || res.status==201) {
                 } else {
                toast("internal server error")
            }
        })
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const Docx = () => {
        axios.get(
            api + "/api/document/docx/" + id, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
        ).then((res) => {
            var file = new Blob([res.data])
            FileSaver.saveAs(file, `document_${id}.docx`)
        }).catch(function () {
            toast("check your latex code")
        })
    }
    const download = () => {
        if (fileUrl != null) {
            window.open(fileUrl)
        }
    }

    return (
        <>
           <br/>
           <br />

            <div className="row test" >
                <div className="column">
                    <div className="container">
                        <div className="row">
                            <div className="column">
                                <button className="button float-left" onClick={Compile}>Run</button>

                                <button className="button button-outline" onClick={download}>PDF</button>

                            </div>
                            <div className="column"><input placeholder="Title of the document" onChange={handleTitle} value={title} /></div>
                            <div className="column">
                                <label for="files" class="button button-clear float-right file-label">Upload</label>
                                <input className="hidden" id="files" type="file" onChange={handleUpload} />

                                <button className="button button-outline float-right " onClick={Docx}>docx</button>
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
                </div>
                <div className="column">
                    <div className="container">
                        {fileUrl != null ? <Doc fileUrl={fileUrl} key={seed} /> : <></>}

                    </div>

                </div>
            </div>
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

        </>
    )
}
export default Document;