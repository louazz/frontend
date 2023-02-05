import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Doc from "../components/Doc.tsx"
function Document() {
    function onChange(newValue) {
        console.log("change", newValue);
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="column">
                        <AceEditor
                            mode="java"
                            theme="github"
                            onChange={onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                        />
                    </div>
                    <div className="column">
                        <Doc fileUrl="sample.pdf" />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Document;