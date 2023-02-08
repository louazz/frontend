import React, { useEffect } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "../App.css"
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc.tsx"
import Sample from "../assets/sample.pdf"
import { useNavigate, useParams } from "react-router";
function Document() {
    const navigate= useNavigate()
    let id= useParams;
    useEffect(()=>{
        if (localStorage.getItem("token")==undefined){
navigate("/")
        }
    })
    function onChange(newValue) {
        console.log("change", newValue);
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
                            <div className="column"><p>docuemnt id: 165d5f5fge56</p></div>
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