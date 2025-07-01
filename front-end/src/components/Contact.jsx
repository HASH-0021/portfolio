import React from 'react';

import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';
import '../font awesome/css/brands.css';

import color from '../Helpers/colors';
import './Contact.css';

const Contact = () => {

	const [showAlert,setShowAlert] = React.useState(null);

	const timeoutRef = React.useRef(0);

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
				setShowAlert({
					"alertText" :	"Thank you for contacting me. I will get back to you shortly.",
					"alertStatus"	:	"success"
				});
				formElement.reset();
				timeoutRef.current = setTimeout(() => {
					setShowAlert(null);
					clearTimeout(timeoutRef.current);
				},8000);
			}else if (response.status === 403 && response.body === "Bots detected.") {
				setShowAlert({
					"alertText" :	`Status Code: ${response.status}. Please refrain from using bots`,
					"alertStatus"	:	"warning"
				});
				timeoutRef.current = setTimeout(() => {
					setShowAlert(null);
					clearTimeout(timeoutRef.current);
				},8000);
			}else {
				setShowAlert({
					"alertText"	:	`Form submission failed. Status Code: ${response.status}`,
					"alertStatus"	:	"error"
				});
				timeoutRef.current = setTimeout(() => {
					setShowAlert(null);
					clearTimeout(timeoutRef.current);
				},8000);
			}
		})
		.catch(error => {
			setShowAlert({
				"alertText"	:	`Network error occured. Error message: ${error}`,
				"alertStatus"	:	"error"
			});
			timeoutRef.current = setTimeout(() => {
				setShowAlert(null);
				clearTimeout(timeoutRef.current);
			},8000);
		})
	}

	React.useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://www.google.com/recaptcha/api.js";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		}
	},[]);

	return (
		<section id = "contact-section">
			<Paper
				square={false}
				elevation={3}
				sx={{
						ml:{xs:0,md:"5%"},
						mt:8,
						mb:{xs:0,md:8},
						padding:"2% 5%",
						width:{ xs:"75%",md:"45%" },
						bgcolor:color.sectionBgColor
					}}
			>
				<h2>Contact Form</h2>
				<Stack
					component="form"
					autoComplete="off"
					sx={{ mx:{xs:"7.5%",sm:"12.5%"},my:4,width:{xs:"85%",sm:"75%"},bgcolor: color.itemBgColor,border:"solid black 2px" }}
					onSubmit = {event => onFormSubmit(event)}
				>
					<TextField
						label="Name"
						name="name"
						variant="filled"
						required={true}
						inputProps={{ maxLength:"50" }}
						autoComplete="off"
						sx={{
								"& .MuiFilledInput-root":{bgcolor:"white",borderRadius:0},
								"& .MuiFilledInput-root:hover":{bgcolor:"white"},
								"& .MuiFilledInput-root.Mui-focused":{bgcolor:"white",border:"2px solid #1976d2"},
								"& .MuiFilledInput-root::after":{border:0}
							}}
					/>
					<TextField
						label="E-mail"
						name="email"
						variant="filled"
						type="email"
						required={true}
						inputProps={{ maxLength:"60" }}
						autoComplete="off"
						sx={{
								"& .MuiFilledInput-root":{bgcolor:"white",borderRadius:0},
								"& .MuiFilledInput-root:hover":{bgcolor:"white"},
								"& .MuiFilledInput-root.Mui-focused":{bgcolor:"white",border:"2px solid #1976d2"},
								"& .MuiFilledInput-root::after":{border:0}
							}}
					/>
					<TextField
						label="Subject"
						name="subject"
						variant="filled"
						required={true}
						inputProps={{ maxLength:"100" }}
						sx={{
								"& .MuiFilledInput-root":{bgcolor:"white",borderRadius:0},
								"& .MuiFilledInput-root:hover":{bgcolor:"white"},
								"& .MuiFilledInput-root.Mui-focused":{bgcolor:"white",border:"2px solid #1976d2"},
								"& .MuiFilledInput-root::after":{border:0}
							}}
					/>
					<TextField
						label="Message"
						name="message"
						variant="filled"
						multiline={true}
						rows={3}
						required={true}
						inputProps={{ maxLength:"500" }}
						sx={{
								"& .MuiFilledInput-root":{bgcolor:"white",borderRadius:0},
								"& .MuiFilledInput-root:hover":{bgcolor:"white"},
								"& .MuiFilledInput-root.Mui-focused":{bgcolor:"white",border:"2px solid #1976d2"},
								"& .MuiFilledInput-root::after":{border:0}
							}}
					/>
					<div id="captcha-container">
						<div className = "g-recaptcha" data-sitekey = "6Lc-DB0pAAAAAI0Kt_WrRkv6nlNE7GqdEkRkH7dJ"></div>
					</div>
					<Tooltip title="Send message" arrow>
						<Button
							variant="contained"
							size="small"
							endIcon={<i className = "fa-regular fa-paper-plane"></i>}
							sx={{
									mx: "auto",
									my: 1,
									fontWeight: "bold",
									transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,scale 250ms",
									"&:active": {scale: "0.95"}
								}}
							type="submit"
							disabled={showAlert !== null}
						>
							Send
						</Button>
					</Tooltip>
					{
						showAlert &&
						<Alert severity={showAlert["alertStatus"]}>
							{showAlert["alertText"]}
						</Alert>
					}
				</Stack>
			</Paper>
			<Paper square={false} elevation={3} sx={{ mx:{xs:0,md:"5%"},my:8,padding:"2% 5%",width:{xs:"75%",sm:"50%",md:"20%"},bgcolor:color.sectionBgColor }}>
				<h2>Links</h2>
				<List dense={true} sx={{ mx:"2%",my:4,p:1,bgcolor: color.itemBgColor,border: "solid black 2px" }}>
					<Tooltip title="Go to my e-mail address" placement="right" arrow>
						<Link color="inherit" underline="none" href = "mailto:dvsriharsha2198@gmail.com" target = "_blank" rel = "noopener noreferrer">
							<ListItem sx={{ cursor:"pointer","&:hover":{ border:"solid blue 1px",color:"blue" } }}>
								<ListItemIcon sx={{ width:"50%",justifyContent:"center",color:"inherit" }}>
									<i className = "fa-regular fa-envelope"></i>
								</ListItemIcon>
								<ListItemText primary="E-mail" sx={{width:"50%"}} />
							</ListItem>
						</Link>
					</Tooltip>
					<Divider sx={{ borderWidth: 1 }} />
					<Tooltip title="Go to my LinkedIn profile" placement="right" arrow>
						<Link color="inherit" underline="none" href = "https://www.linkedin.com/in/sri-harsha-dv" target = "_blank" rel = "noopener noreferrer">
							<ListItem sx={{ cursor:"pointer","&:hover":{ border:"solid blue 1px",color:"blue" } }}>
								<ListItemIcon sx={{ width:"50%",justifyContent:"center",color:"inherit" }}>
									<i className = "fa-brands fa-linkedin"></i>
								</ListItemIcon>
								<ListItemText primary="LinkedIn" sx={{width:"50%"}} />
							</ListItem>
						</Link>
					</Tooltip>
					<Divider sx={{ borderWidth: 1 }} />
					<Tooltip title="Go to my GitHub profile" placement="right" arrow>
						<Link color="inherit" underline="none" href = "https://github.com/HASH-0021" target = "_blank" rel = "noopener noreferrer">
							<ListItem sx={{ cursor:"pointer","&:hover":{ border:"solid blue 1px",color:"blue" } }}>
								<ListItemIcon sx={{ width:"50%",justifyContent:"center",color:"inherit" }}>
									<i className = "fa-brands fa-github"></i>
								</ListItemIcon>
								<ListItemText primary="GitHub" sx={{width:"50%"}} />
							</ListItem>
						</Link>
					</Tooltip>
					<Divider sx={{ borderWidth: 1 }} />
					<Tooltip title="Go to my LeetCode profile" placement="right" arrow>
						<Link color="inherit" underline="none" href = "https://leetcode.com/hash_21" target = "_blank" rel = "noopener noreferrer">
							<ListItem sx={{ cursor:"pointer","&:hover":{ border:"solid blue 1px",color:"blue" } }}>
								<ListItemIcon sx={{ width:"50%",justifyContent:"center",color:"inherit" }}>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/></svg>
								</ListItemIcon>
								<ListItemText primary="LeetCode" sx={{width:"50%"}} />
							</ListItem>
						</Link>
					</Tooltip>
					<Divider sx={{ borderWidth: 1 }} />
					<Tooltip title="Go to my kaggle profile" placement="right" arrow>
						<Link color="inherit" underline="none" href = "https://www.kaggle.com/dvsriharsha" target = "_blank" rel = "noopener noreferrer">
							<ListItem sx={{ cursor:"pointer","&:hover":{ border:"solid blue 1px",color:"blue" } }}>
								<ListItemIcon sx={{ width:"50%",justifyContent:"center",color:"inherit" }}>
									<i className = "fa-brands fa-kaggle"></i>
								</ListItemIcon>
								<ListItemText primary="kaggle" sx={{width:"50%"}} />
							</ListItem>
						</Link>
					</Tooltip>
				</List>
			</Paper>
		</section>
	)
}

export default Contact;