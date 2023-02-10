import image from '../assets/first-post.png';
import { loremIpsum , LoremIpsum} from "lorem-ipsum";
function Home() {

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
    return (
        <div className="container">
            <img src={image} />
            <br />
            <blockquote>
                <p><em>{lorem.generateSentences(5)}</em></p>
            </blockquote>
            <br/>
            <div className='row'>
                <div className='column'>
                    <h4>Title</h4>
                    <p>{lorem.generateSentences(2)}</p>
                </div>
                <div className='column'>
                    <h4>Title</h4>
                    <p>{lorem.generateSentences(2)}</p>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <h4>Title</h4>
                    <p>{lorem.generateSentences(2)}</p>
                </div>
                <div className='column'>
                    <h4>Title</h4>
                    <p>{lorem.generateSentences(2)}</p>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                <label for="commentField">Feedback</label>
    <textarea placeholder="Feedback" id="commentField"></textarea>
    <button> submit</button>
                </div>
            </div>
        </div>
    )
}
export default Home;