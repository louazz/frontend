import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "../App.css"
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc.tsx"
import Sample from "../assets/sample.pdf"
import { useNavigate, useParams } from "react-router";
import axios from "axios";
function Document() {
    const [content , setContent]= useState();
const [checker, setChecker]= useState(false);
    const navigate= useNavigate()
    let api= "http://localhost:8080"
    let {id}= useParams();
    useEffect(()=>{
        if (localStorage.getItem("token")==undefined){
navigate("/")
        }else{
            if (checker==false){
            axios.get(api+"/api/doc/"+id,{
                headers: {
                    "Authorization": `Token ${localStorage.getItem('token')}`
                }
            }).then(res=>{if(res.status== 200){setContent(res.data["document"]["content"]); setChecker(true)}else{}})
                
            }
        }
    })
    function onChange(newValue) {
        setContent(newValue)
    }
    
    return (
        <>
        
                <div className="row" >
                    <div className="column">
                        <div className="row">
                            <div className="column">
                          <button className="button button-black button-clear float-left">Run</button>
                           
<button className="button button-black button-outline">PDF</button>
 
                            </div>
                            <div className="column"><p>document id: {id}</p></div>
                            <div className="column">
                            
                                <button className="button button-black button-outline float-right ">docx</button>
                            </div>
                        </div>
                        
                        <AceEditor
                            mode="latex"
                            theme="solarized_light"
                            onChange={onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            height= "1010px"
                            width="100%"
                            value={content}
                            enableBasicAutocompletion={true}
                            enableLiveAutocompletion={true}
                            enableSnippets={true}
                        />
                    </div>
                    <div className="column">
                        <Doc fileUrl={Sample} />
                    </div>
                </div>
         

        </>
    )
}
export default Document;