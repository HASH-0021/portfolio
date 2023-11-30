import profilePic from '../assets/Profile picture.png';
import './Home.css';

const Home = () => {
	return (
        <div id = "home-section">
        	<div id = "profile-text">
	        	<p id = "salutation">
	            	Hi there,<br />
	            	Good Day!!<br />
	          	</p>
	        	<p id = "content-body">
	            	My name is <strong>Sri Harsha</strong>. I am a Software Developer.
	            	<br />
	            	I have created this portfolio to showcase my works, skills and other details about me. I am currently looking for an opportunity as a Full Stack Web Developer.
	            	<br />
	            	Besides that I am a cuber, a gamer and a puzzle enthusiast. I am fluent in English, Telugu and Hindi. Self learning and perseverence are my greatest strengths.
	            	<br />
	            	Explore other pages on this website to know more about me. <i>Have a great day!!!</i>
	            	<br />
	            	<br />
	            	<i style = {{color:"brown"}}><u>Note</u>:- This website is still under development and will be improved by implementing better thematic colours, pictures, responsiveness and functionality in upcoming days.</i>
	          	</p>
	        </div>
	        <div id = "profile-image">
	        	<img src = {profilePic} alt = "Profile picture" />
	        </div>
        </div>
	);
}

export default Home;