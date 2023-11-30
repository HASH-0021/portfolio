import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Contact.css';
import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';
import '../font awesome/css/brands.css';

const Contact = () => {

	const {setInfoBox} = useOutletContext();

	const onFormSubmit = (event) => {
		event.preventDefault();
		const formElement = event.currentTarget;
		const formData = new FormData(formElement);
		fetch("/submit_form", {
			method	:	"POST",
			body 	:	formData
		})
		.then(response => {
			if (response.status === 204) {
				setInfoBox(
					<div className = "external-div">
						<div id = "info-box">
							<i id = "close-infobox-button" className = "fa-solid fa-rectangle-xmark" onClick = {() => setInfoBox(null)}></i>
							<h3>Submission Message</h3>
							<p>Thank you for contacting me. I will get back to you shortly.</p>
						</div>
					</div>
				);
				formElement.reset();
			}else if (response.status === 403 && response.body === "Bots detected.") {
				setInfoBox(
					<div className = "external-div">
						<div id = "info-box">
							<i id = "close-infobox-button" className = "fa-solid fa-rectangle-xmark" onClick = {() => setInfoBox(null)}></i>
							<h3>Submission Message</h3>
							<p>{"Status Code:"+response.status+". Please refrain from using bots"}</p>
						</div>
					</div>
				);
			}else {
				setInfoBox(
					<div className = "external-div">
						<div id = "info-box">
							<i id = "close-infobox-button" className = "fa-solid fa-rectangle-xmark" onClick = {() => setInfoBox(null)}></i>
							<h3>Submission Message</h3>
							<p>{"Form submission failed. Status Code:"+response.status}</p>
						</div>
					</div>
				);
			}
		})
		.catch(error => {
			setInfoBox(
				<div className = "external-div">
					<div id = "info-box">
						<i id = "close-infobox-button" className = "fa-solid fa-rectangle-xmark" onClick = {() => setInfoBox(null)}></i>
						<h3>Submission Message</h3>
						<p>{"Network error occured. Error message:"+error}</p>
					</div>
				</div>
			);
		})
	}

	React.useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://www.google.com/recaptcha/api.js";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		// Cleanup function to remove script when component unmounts
		return () => {
			document.body.removeChild(script);
		}
	},[]);

	return (
		<div id = "contact-section">
			<div id = "contact-container">
				<div id = "contact-form-container">
					<h2>Contact Form</h2>
					<form id = "contact-form" onSubmit = {event => onFormSubmit(event)}>
						<div>
							<label htmlFor = "contact-name">Name:</label>
							<input id = "contact-name" type = "text" name = "name" maxLength = "50" placeholder = "Enter your name here..." required />
						</div>
						<div>
							<label htmlFor = "contact-email">E-mail:</label>
							<input id = "contact-email" type = "email" name = "email" maxLength = "60" placeholder = "Enter your e-mail address here..." required />
						</div>
						<div>
							<label htmlFor = "contact-subject">Subject:</label>
							<input id = "contact-subject" type = "text" name = "subject" maxLength = "100" placeholder = "Enter your subject here..." />
						</div>
						<div>
							<label htmlFor = "contact-message">Message:</label>
							<textarea id = "contact-message" rows = "5" name = "message" maxLength = "500" placeholder = "Enter your message here..." required />
						</div>
						<div id = "recaptcha">
							<div className = "g-recaptcha" data-sitekey = "6Lc-DB0pAAAAAI0Kt_WrRkv6nlNE7GqdEkRkH7dJ"></div>
						</div>
						<div id = "send-button-wrapper">
							<button type = "submit">Send <i className = "fa-regular fa-paper-plane"></i></button>
						</div>
					</form>
				</div>
				<div id = "links-container">
					<h2>Links</h2>
					<ul id = "links">
						<li><a href = "mailto:dvsriharsha2198@gmail.com" target = "_blank" rel = "noopener noreferrer"><i className = "fa-regular fa-envelope"></i> E-mail</a></li>
						<li><a href = "https://www.linkedin.com/in/sri-harsha-dv" target = "_blank" rel = "noopener noreferrer"><i className = "fa-brands fa-linkedin"></i> LinkedIn</a></li>
						<li><a href = "https://github.com/HASH-0021" target = "_blank" rel = "noopener noreferrer"><i className = "fa-brands fa-github"></i> GitHub</a></li>
						<li><a href = "https://leetcode.com/hash_21" target = "_blank" rel = "noopener noreferrer"><i className = "fa-solid fa-code"></i> LeetCode</a></li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Contact;