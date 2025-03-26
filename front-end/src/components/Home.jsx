import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import profilePic from '../assets/Profile picture.png';

import './Home.css';

const Home = () => {
	return (
        <section id = "home-section">
        	<Paper square={false} elevation={3} sx={{ mt:8,px:"5%",py:{xs:"4%",sm:"2%"},width:"75%",bgcolor:"#edfdff" }}>
	        	<p id = "salutation">
	            	Hi there,
	          	</p>
	        	<p id = "content-body">
	            	My name is <strong>Sri Harsha</strong>. I am a Software Developer.
	            	<br />
	            	<br />
	            	This is my portfolio showcasing all of my works, skills and other details. I am currently looking for an opportunity as a Front-end Web Developer. I even have some knowledge in Python programming language, Back-end web development and Databases.
	            	<br />
	            	<br />
	            	Besides that I am a cuber, a gamer and a puzzle enthusiast. I am fluent in English, Telugu and Hindi.
	            	<br />
	            	<br />
	            	Explore other pages on this website to know more about me. <i>Have a great day!!!</i>
	          	</p>
	        </Paper>
	        <Avatar
	        	alt = "Sri Harsha's picture"
	        	src = {profilePic}
	        	sx = {{ 
	        			my : 8,
	        			width : 250,
	        			height : 250,
	        			borderRadius : "50%",
	        			boxShadow:"0px 0px 4px 1px rgba(0,0,0,0.2),0px 0px 5px 2px rgba(0,0,0,0.14),0px 1px 10px 4px rgba(0,0,0,0.12)"
	        		}} 
	        />
        </section>
	);
}

export default Home;