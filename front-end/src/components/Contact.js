import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Contact.css';

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
					<div id = "info-box">
						<button id = "close-infobox-button" onClick = {() => setInfoBox(null)}>X</button>
						<h3>Submission Message</h3>
						<p>Thank you for contacting me. I will get back to you shortly.</p>
					</div>
				);
				formElement.reset();
			}else {
				setInfoBox(
					<div id = "info-box">
						<button id = "close-infobox-button" onClick = {() => setInfoBox(null)}>X</button>
						<h3>Submission Message</h3>
						<p>{"Form submission failed. Status Code:"+response.status}</p>
					</div>
				);
			}
		})
		.catch(error => {
			setInfoBox(
				<div id = "info-box">
					<button id = "close-infobox-button" onClick = {() => setInfoBox(null)}>X</button>
					<h3>Submission Message</h3>
					<p>{"Network error occured. Error message:"+error}</p>
				</div>
			);
		})
	}

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
						<div id = "send-button-wrapper">
							<button type = "submit">Send</button>
						</div>
					</form>
				</div>
				<div id = "links-container">
					<h2>Links</h2>
					<ul id = "links">
						<li><a href = "mailto:dvsriharsha2198@gmail.com">E-mail</a></li>
						<li><a href = "https://www.linkedin.com/in/sri-harsha-dv">LinkedIn</a></li>
						<li><a href = "https://github.com/HASH-0021">GitHub</a></li>
						<li><a href = "https://leetcode.com/hash_21">LeetCode</a></li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Contact;