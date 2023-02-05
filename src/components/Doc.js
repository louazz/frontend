import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

function Doc(props){
    return (
        <><Viewer fileUrl={props.fileUrl }/></>
    )
}
export default Doc;