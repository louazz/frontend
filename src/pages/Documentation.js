import Doc from '../components/Doc.tsx'
import tuto from "../assets/tuto.pdf"
function Documentation (){
    return (
        <div className='container'>
            <br/>
        <Doc fileUrl={tuto}/>
        </div>
    )
}
export default Documentation;