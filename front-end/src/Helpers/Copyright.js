import Paper from '@mui/material/Paper';

import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';

import './Copyright.css';

const Copyright = () => {

	const smileyToEyeHearts = (event) => {
		const emoji = event.currentTarget;
		emoji.classList.replace("fa-face-smile","fa-face-grin-hearts");
	}

	const eyeHeartsToSquint = (event) => {
		const emoji = event.currentTarget;
		emoji.classList.replace("fa-face-grin-hearts","fa-face-laugh-squint");
	}

	const squintToEyeHearts = (event) => {
		const emoji = event.currentTarget;
		emoji.classList.replace("fa-face-laugh-squint","fa-face-grin-hearts");
		showHearts(event);
	}

	const showHearts = async (event) => {
	const footerNote = event.currentTarget.parentElement;
	const [heart1,heart2] = footerNote.querySelectorAll(".heart");
	await new Promise(resolve => 
	                              {
	                                heart2.classList.add("heart-2-start");
	                                setTimeout(resolve, 750);
	                              });
	await new Promise(resolve => 
	                              {
	                                heart2.classList.replace("heart-2-start","heart-2-end");
	                                setTimeout(resolve, 750);
	                              });
	await new Promise(resolve => 
	                              {
	                                heart1.classList.add("heart-1-start");
	                                setTimeout(resolve, 750);
	                              });
	await new Promise(resolve => 
	                              {
	                                heart1.classList.replace("heart-1-start","heart-1-end");
	                                setTimeout(resolve, 750);
	                              });
		heart1.classList.remove("heart-1-end");
		heart2.classList.remove("heart-2-end");
	}

	const eyeHeartsToSmiley = (event) => {
		const emoji = event.currentTarget;
		emoji.classList.replace("fa-face-grin-hearts","fa-face-smile");
	}

	return(
		<Paper
			elevation={3}
			square={true}
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				bgcolor: '#334593',
				color: '#ffea05',
				border:"solid black 1px",
				boxShadow:"0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
				fontWeight: '550'
			}}
		>
			Created by Sri Harsha.
	          <i className = "fa-solid fa-heart fa-2xs heart"></i>
	          <i 
	            className = "fa-regular fa-face-smile emoji" 
	            onMouseEnter = {smileyToEyeHearts} 
	            onMouseDown = {eyeHeartsToSquint} 
	            onMouseUp = {squintToEyeHearts} 
	            onMouseLeave = {eyeHeartsToSmiley}
	          ></i>
	          <i className = "fa-solid fa-heart fa-xs heart"></i>
		</Paper>
	);
}

export default Copyright;