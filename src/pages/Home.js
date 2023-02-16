import image from '../assets/first-post.png';
import { loremIpsum, LoremIpsum } from "lorem-ipsum";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const [email, setEmail] = useState()
    const [feedback, setFeedback] = useState()
    const api = "https://backend.encrylatex.live"
    const navigate = useNavigate()
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleFeedback = (e) => {
        setFeedback(e.target.value)
    }
    const submit = () => {
        axios.post(api + "/api/feedback", {
            email: email,
            feedback: feedback
        }).then(res => { if (res.status == 200) { toast("message sent") } else { toast("internal server error") } })
    }
    return (
        <div className="container">
            <img src={image} />
            <br />
            <blockquote>
                <p><em>The application allows the users to create Latex documents and compile them online. you may start by creating a new latex document from scratch or use a template provided by our platform. Remember that you can always export your work to DOCX format while clicking on the DOCX button</em></p>
            </blockquote>
            <br />
            <div className='row'>
                <div className='column'>
                    <h4>Register</h4>
                    <p>create an account and <a onClick={() => { navigate("/login") }}>login</a> ; you should enter a vaid username and password. You will recieve a confirmation email once the registration is succeeded. if you've forgot your password you can always click on the forgot credential that will allow you to generate new password</p>
                </div>
                <div className='column'>
                    <h4>View & Edit</h4>
                    <p>Navigate to search and create a Latex document while specifying the title and the template. if you want to view an existing document click on the view button that corresponds to the relevant title. If feel that you need to review the LaTex syntax, you can click on documentation link on the navigation bar.</p>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <h4>Compile, Run, & Export</h4>
                    <p>Once the document to edit is chosen you can click on the RUN button to compile and SAVE your LaTex code. To upload a configuration file or an image, click on the upload button and choose the target entity. To export a document to Microsoft Word readable format click on DOCX button</p>
                </div>
                <div className='column'>
                    <h4>Our Mission</h4>
                    <p>Our mission is to give users the best experience while writing their documents. EncryLatex will allow the user to enjoy writing any type of document using the famous LaTex language</p>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <label for='email'>Email</label>
                    <input id="email" type="email" placeholder='your Email' onChange={handleEmail} />
                    <br />
                    <label for="commentField">Feedback</label>
                    <textarea placeholder="Feedback" id="commentField" onChange={handleFeedback}></textarea>
                    <button onClick={submit}> submit</button>
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
        </div>
    )
}
export default Home;