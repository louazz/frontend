import React, { useEffect } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc"
import Sample from "../assets/sample.pdf"
function Document() {
    function onChange(newValue) {
        console.log("change", newValue);
    }
    
    return (
        <>
        
                <div className="row">
                    <div className="column">
                        <AceEditor
                            mode="ruby"
                            theme="solarized_light"
                            onChange={onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
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