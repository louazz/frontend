import { useParams } from "react-router";
import Doc from "../components/Doc.tsx";
import Sample from '../assets/sample.pdf'
function View() {
    let id = useParams;
    return (
        <div class="container">
            <Doc fileUrl={Sample} />
        </div>
    )
}
export default View;