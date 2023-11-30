import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { projects } from '../APIs/ProjectsAPI';
import { jobs } from '../APIs/JobsAPI';
import { education } from '../APIs/EducationAPI';
import './Works.css';
import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';

const Works = () => {
	const [carousel,setCarousel] = React.useState(null);
	const [cardWidth,setCardWidth] = React.useState(0);
	const {projectView,setProjectView} = useOutletContext();
	let timeoutId,autoscrollCarousel;

	React.useEffect(() => {
		const carouselVar = document.getElementById("carousel")
		setCarousel(carouselVar);
		setCardWidth(carouselVar.getElementsByClassName("carousel-item-container")[0].offsetWidth);
	},[]);

	React.useEffect(() => {
		if (carousel) {
			let carouselChildren = [...carousel.children];
			let cardPerView = Math.round(carousel.offsetWidth/cardWidth);
			if (projects.length >= cardPerView) {
				for (let i = 0; i < cardPerView; i++) {
					carousel.insertBefore(carouselChildren[projects.length-i-1].cloneNode(true),carousel.firstChild);
					carousel.firstChild.addEventListener("click", () => expandProject(projects[projects.length-i-1]));
					carousel.appendChild(carouselChildren[i].cloneNode(true));
					carousel.lastChild.addEventListener("click", () => expandProject(projects[i]));
				}
				carousel.classList.add("no-scroll-transition");
				carousel.scrollLeft = carousel.offsetWidth;
				carousel.classList.remove("no-scroll-transition");
				autoscrollCarousel();
			}else {
				let buttonWrapper = document.getElementById("button-wrapper");
				buttonWrapper.classList.add("button-disabled");
				[...buttonWrapper.children].forEach(button => {button.disabled = "true";});
			}
		}
	},[carousel,cardWidth,autoscrollCarousel]);

	const carouselSlideLeft = () => {
		carousel.scrollLeft -= cardWidth;
	}

	const carouselSlideRight = () => {
		carousel.scrollLeft += cardWidth;
	}

	const infiniteScroll = () => {
		if(carousel) {
		    if(carousel.scrollLeft === 0) {
		        carousel.classList.add("no-scroll-transition");
		        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
		        carousel.classList.remove("no-scroll-transition");
		    }
		    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
		        carousel.classList.add("no-scroll-transition");
		        carousel.scrollLeft = carousel.offsetWidth;
		        carousel.classList.remove("no-scroll-transition");
		    }
		    clearTimeout(timeoutId);
		    if (!carousel.parentNode.matches(":hover")) autoscrollCarousel();
		}
	}
	
	autoscrollCarousel = () => {
		if (!projectView) {
			timeoutId = setTimeout(() => carousel.scrollLeft += cardWidth,3000);
		}
	}

	const expandProject = (project) => {
		clearTimeout(timeoutId);
		setProjectView(
			<div className = "project-external-div">
				<div id = "project-container">
					<div id = "close-project-button-wrapper">
						<i id = "close-project-button" className = "fa-solid fa-circle-xmark" onClick = {() => {
																											setProjectView(null);
																											autoscrollCarousel();
																										}}></i>
					</div>
					<img id = "project-image" src = {project.image} alt = {project.title+" logo"} />
					<div id = "project-text">
						<h2>{project.title}</h2>
						<hr />
						<h3>Description:</h3>
						<p>{project.longDesc}</p>
						<h3>Skills Used:</h3>
						<ul>
							{project.skills.map((skill,idx) => <li key = {idx}>{skill}</li>)}
						</ul>
						<h3>Links:</h3>
						<ul id = "project-links">
							{
								Object.entries(project.links)
								.map(([site,url],idx) => {
									return 	<li key = {idx}>
												<b>{site}</b> - <a href = {url} target = "_blank" rel = "noopener noreferrer">{url}</a>
											</li>
									}
								)
							}
						</ul>
					</div>
				</div>
				<div className = "project-empty-div" onClick = {() => {
																		setProjectView(null);
																		autoscrollCarousel();
																	}}></div>
			</div>
		);
	}

	const getCarouselItem = (project,idx) => {
		return (
			<li className = "carousel-item-container" key = {idx}>
				<div className = "carousel-item" onClick = {() => expandProject(project)}>
					<img className = "carousel-image" src = {project.image} alt = {project.title+" logo"} />
					<div className = "carousel-item-text">
						<h4>{project.title}</h4>
						<hr />
						<p>{project.shortDesc}</p>
					</div>
				</div>
			</li>
		)
	}

	const getJobs = (job,idx1) => {
		return (
			<div className = "jobs" key = {idx1}>
				<h4>{job.company}</h4>
				{job.projects.map((project,idx2) => {
					return (
						<div className = "job-projects" key = {idx2}>
							<p><em>{project.role}</em></p>
							<p><i>Duration : {project.duration}</i></p>
							<p>Experience :</p>
							<ul>
								{project.experiences.map((exp,idx3) => <li key = {idx3}>{exp}</li>)}
							</ul>
						</div>
					)
				})}
			</div>
		)
	}

	const showEducationDetails = (event) => {
		const elementDetails = event.currentTarget.querySelector(".some-education-details");
		const navIcon = event.currentTarget.querySelector(".nav-icon");
		if (elementDetails.classList.contains("show-education-details")) {
			elementDetails.classList.remove("show-education-details");
			navIcon.classList.replace("fa-circle-chevron-up","fa-circle-chevron-down");
		}else {
			elementDetails.classList.add("show-education-details");
			navIcon.classList.replace("fa-circle-chevron-down","fa-circle-chevron-up");
		}
	}

	const getEducation = (edu,idx) => {
		return (
			<div className = "education" key = {idx} onClick = {showEducationDetails}>
				<div className = "education-content">
					<div className = "education-title">
						<h4>{edu.class}</h4>
						<p><i>({edu.stage})</i></p>
					</div>
					<div className = "education-details">
						<div className = "some-education-details">
							<p><b>Specification</b> : {edu.specifications}</p>
							<p><b>Institution</b> : {edu.institution}</p>
							<p><b>Location</b> : {edu.location}</p>
							<p><b>Duration</b> : {edu.duration}</p>
						</div>
						<p><b>Score</b> : {edu.score}</p>
					</div>
				</div>
				<div className = "nav-icon-container"><i className="fa-solid fa-circle-chevron-down fa-lg nav-icon"></i></div>
			</div>
		)
	}

	return (
		<div id = "works-section">
			<div id = "personal-projects">
				<h2>Personal Projects</h2>
				<div id = "carousel-wrapper" onMouseOver = {() => clearTimeout(timeoutId)} onMouseOut = {autoscrollCarousel}>
					<ul id = "carousel" onScroll = {infiniteScroll}>
						{projects.map((project,idx) => getCarouselItem(project,idx))}
					</ul>
					<div id = "button-wrapper">
						<i className = "fa-regular fa-square-caret-left fa-xl prev" onClick = {carouselSlideLeft}></i>
						<i className = "fa-regular fa-square-caret-right fa-xl next" onClick = {carouselSlideRight}></i>
					</div>
				</div>
			</div>
			<div id = "career-history">
				<h2>Career History</h2>
				<div id = "jobs-wrapper">
					{jobs.map((job,idx) => getJobs(job,idx))}
				</div>
			</div>
			<div id = "education-history">
				<h2>Education History</h2>
				<div id = "education-wrapper">
					{education.map((edu,idx) => getEducation(edu,idx))}
				</div>
			</div>
		</div>
	);
}

export default Works;