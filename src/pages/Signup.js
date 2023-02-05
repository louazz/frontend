import image from "./img5.jpg";

function Signup (){
return (
    <div>
    <blockquote>
    <p><em>This application enables the user to edit and generate LaTex documents online</em> sign up now and enjoy the features</p>
  </blockquote>
<img src={image} height=""/>
<br />
<br />
<h2>Sign Up</h2>
<center>

<div className="row"><div className="column"><input placeholder="Username" type="text"/></div> < div className="column"><input placeholder="email" type="email" /></div></div>  
                <input placeholder="Password" type="password"/>

<button >Submit</button>
</center>


</div>
)
}
export default Signup;