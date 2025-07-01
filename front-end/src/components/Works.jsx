import React from 'react';
import { useOutletContext } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Backdrop from '@mui/material/Backdrop';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';

import { projects } from '../APIs/ProjectsAPI';
import { jobs } from '../APIs/JobsAPI';
import { education } from '../APIs/EducationAPI';

import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';

import color from '../Helpers/colors';
import './Works.css';

const Works = () => {

	const {setAnchorEl} = useOutletContext();

	const [backdropOpen,setBackdropOpen] = React.useState(false);
	const [projectView,setProjectView] = React.useState(null);
	const [itemsBefore,setItemsBefore] = React.useState(null);
	const [itemsAfter,setItemsAfter] = React.useState(null);

	const intervalRef = React.useRef(0);
	const carouselRef = React.useRef(null);
	const cardWidthRef = React.useRef(0);

	const adjustCarousel = React.useCallback(() => {
		cardWidthRef.current = carouselRef.current.childNodes[0].offsetWidth+32;
		let cardPerView = Math.round(carouselRef.current.offsetWidth/cardWidthRef.current);
		if (projects.length >= cardPerView) {
			setItemsBefore(
							<>
								{projects.slice(projects.length-cardPerView).map((project,idx) =>	<CarouselItem
																										project = {project}
																										key = {idx}
																										setBackdropOpen = {setBackdropOpen}
																										setProjectView = {setProjectView}
																										closeProject = {closeProject} 
																									/>
																				)}
							</>
							);
			setItemsAfter(
							<>
								{projects.slice(0,cardPerView).map((project,idx) =>	<CarouselItem
																						project = {project}
																						key = {idx}
																						setBackdropOpen = {setBackdropOpen}
																						setProjectView = {setProjectView}
																						closeProject = {closeProject} 
																					/>
																	)}
							</>
							);
		}else {
			let buttonWrapper = document.getElementById("button-wrapper");
			buttonWrapper.classList.add("button-disabled");
			[...buttonWrapper.children].forEach(button => {button.disabled = "true";});
		}
	},[]);

	window.onresize = () => {
		if (window.outerWidth >= 600) {
            setAnchorEl(null);
        }
		clearInterval(intervalRef.current);
		adjustCarousel();
	}

	React.useEffect(() => {
		carouselRef.current = document.getElementById("carousel");
		adjustCarousel();
		return () => {
			clearInterval(intervalRef.current);
		};
	},[adjustCarousel]);

	React.useEffect(() => {
		if (itemsBefore) {
			clearInterval(intervalRef.current);
			carouselRef.current.classList.add("no-scroll-transition");
			carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
			carouselRef.current.classList.remove("no-scroll-transition");
			intervalRef.current = setInterval(() => carouselRef.current.scrollLeft += cardWidthRef.current,3000);
		}
	},[itemsBefore])

	const autoscrollCarousel = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => carouselRef.current.scrollLeft += cardWidthRef.current,3000);
	}


	const arrowHover = (event) => {
		const arrowButton = event.currentTarget;
		arrowButton.classList.replace("fa-regular","fa-solid");
	}

	const arrowHoverOut = (event) => {
		const arrowButton = event.currentTarget;
		arrowButton.classList.replace("fa-solid","fa-regular");
	}

	const carouselSlideLeft = (event) => {
		carouselRef.current.scrollLeft -= cardWidthRef.current;
	}

	const carouselSlideRight = (event) => {
		carouselRef.current.scrollLeft += cardWidthRef.current;
	}

	const infiniteScroll = () => {
		if (carouselRef.current) {
			let carousel = carouselRef.current;
		    if (carousel.scrollLeft <= 10) {
		        carousel.classList.add("no-scroll-transition");
		        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
		        carousel.classList.remove("no-scroll-transition");
		    }
		    else if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 10) {
		        carousel.classList.add("no-scroll-transition");
		        carousel.scrollLeft = carousel.offsetWidth;
		        carousel.classList.remove("no-scroll-transition");
		    }
		}
	}

	const closeProject = () => {
		const pageBody = document.querySelector("body");
		pageBody.removeAttribute("style");
		setBackdropOpen(false);
		setProjectView(null);
	}

	return (
		<section id = "works-section">
			<Paper square={false} elevation={3} sx={{ mt:8,padding:"2% 5%",width:"75%",bgcolor:color.sectionBgColor }}>
				<h2>Personal Projects</h2>
				<div id = "carousel-wrapper"  onMouseEnter = {() => clearInterval(intervalRef.current)} onMouseLeave = {autoscrollCarousel}>
					<div id = "carousel" onScroll = {infiniteScroll}>
						{itemsBefore}
						{projects.map((project,idx) =>	<CarouselItem
																project = {project}
																key = {idx}
																setBackdropOpen = {setBackdropOpen}
																setProjectView = {setProjectView}
																closeProject = {closeProject} 
														/>
									)}
						{itemsAfter}
					</div>
					<div id = "button-wrapper">
						<Tooltip title="Move carousel right" placement="left" arrow>
							<i className = "fa-regular fa-square-caret-left fa-xl prev" onMouseEnter = {arrowHover} onMouseLeave = {arrowHoverOut} onClick = {carouselSlideLeft}></i>
						</Tooltip>
						<Tooltip title="Move carousel left" placement="right" arrow>
							<i className = "fa-regular fa-square-caret-right fa-xl next" onMouseEnter = {arrowHover} onMouseLeave = {arrowHoverOut} onClick = {carouselSlideRight}></i>
						</Tooltip>
					</div>
					<Backdrop
						sx={{ bgcolor: "#000000bf",zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={backdropOpen}
						onClick={closeProject}
					>
						{projectView}
					</Backdrop>
				</div>
			</Paper>
			<Paper square={false} elevation={3} sx={{ mt:8,padding:"2% 5%",width:"75%",bgcolor:color.sectionBgColor }}>
				<h2>Career History</h2>
				<div id = "jobs-wrapper">
					{jobs.map((job,idx) => <Job job={job} key={idx} />)}
				</div>
			</Paper>
			<Paper square={false} elevation={3} sx={{ my:8,padding:"2% 5%",width:"75%",bgcolor:color.sectionBgColor }}>
				<h2>Education History</h2>
				<div id = "education-wrapper">
					{education.map((edu,idx) => <Education edu={edu} key={idx} />)}
				</div>
			</Paper>
		</section>
	);
}

const CarouselItem = ({ project,setBackdropOpen,setProjectView,closeProject }) => {

	const expandProject = (project) => {
		const pageBody = document.body;
		pageBody.style.overflow = "hidden";
		setBackdropOpen(true);
		setProjectView(
			<Card 
				sx = {{
						width: {xs:"60%",sm:"50%",md:"40%",lg:"30%"},
						height: "70%",
						bgcolor: color.itemBgColor,
						border: "solid black 4px",
						overflow: "auto"
					}}
				onClick={(event) => event.stopPropagation()}
			>
				<Tooltip title="Close button" placement="bottom-end" arrow>
					<Fab
						aria-label="close"
						size="small"
						sx={{
								position: "sticky",
								top:"8px",
								left:"calc(100% - 40px)",
								m:1,
								p:0,
								bgcolor:"rgba(0,0,0,0.2)",
								color:"black",
								transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,scale 250ms",
								"&:hover": {color:"red"},
								"&:active": {scale: "0.95"}
							}}
						onClick={closeProject}
					>
						<CloseIcon fontSize="small" />
					</Fab>
				</Tooltip>
				<div
					style={{
							position:'relative',
							top:'-56px'
						}}
				>
					<CardMedia
						component="img"
						image={project.image}
						alt={`${project.title} logo`}
					/>
					<Divider sx={{ borderWidth: 1 }} />
					<CardHeader title={project.title} sx={{ bgcolor: color.itemHeaderColor }} />
					<Divider sx={{ borderWidth: 1 }} />
					<CardContent sx={{ textAlign: "left" }}>
						<CardHeader title={"Desription"} />
						<CardContent>{project.longDesc}</CardContent>
						<CardHeader title={"Skills Used"} />
						<ul>
				 			{project.skills.map((skill,idx) => <li key = {idx}>{skill}</li>)}
				 		</ul>
				 		<CardHeader title={"Links"} />
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
					</CardContent>
				</div>
			</Card>
		);
	}

	return (
			<Card
				sx={{ mx: 2,bgcolor: color.itemBgColor,border: "solid black 2px",cursor: "pointer" }}
				onClick = {() => expandProject(project)}
			>
				<CardMedia
					component="img"
					image={project.image}
					alt={`${project.title} logo`}
				/>
				<Divider sx={{ borderWidth: 1 }} />
				<CardHeader title={project.title} sx={{ "& .MuiCardHeader-title": {fontSize: "1.2rem"},bgcolor: color.itemHeaderColor }} />
				<Divider sx={{ borderWidth: 1 }} />
				<CardContent>{project.shortDesc}</CardContent>
			</Card>
		)
}

const Job = ({ job }) => {
	return (
		<Card sx={{ my: 2,bgcolor:color.itemBgColor,border: "solid black 2px" }}>
			<CardHeader title={job.company} sx={{ "& .MuiCardHeader-title": {fontSize: "1.2rem"},bgcolor: color.itemHeaderColor }} />
			<Divider sx={{ borderWidth: 1 }} />
			{
				job.projects.map((project,idx1) => {
					return (
						<CardContent key = {idx1} sx={{ m: 3,border: "solid black 1px" }}>
							<CardHeader subheader={
													<>
														<b>{project.role}</b>
														<i> ({project.duration})</i>
													</>
							} />
							<Divider sx={{ borderWidth: 1 }} />
							<CardContent>
								Experience :
								<ul id = "experience-list">
				 					{project.experiences.map((exp,idx2) => <li key = {idx2}>{exp}</li>)}
				 				</ul>
				 			</CardContent>
						</CardContent>
					)
				})
			}
		</Card>
	)

}

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
		  return <IconButton {...other} />;
		})(({ theme, expand }) => ({
		  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
		  margin: 'auto',
		  marginRight: '0',
		  transition: theme.transitions.create('transform', {
		    duration: theme.transitions.duration.shortest,
		  }),
	}));

const Education = ({ edu }) => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				my: 2,
				"& .MuiCardHeader-title": {fontSize: "1.2rem"},
				bgcolor: color.itemHeaderColor,
				border: "solid black 2px"				
			}}			
		>
			<CardHeader title={edu.class} subheader={<i>({edu.stage})</i>} />
			<Divider sx={{ borderWidth: 1 }} />
			<Tooltip
				title={`Click to ${expanded ? "hide": "show more"} details`}
				followCursor
				slotProps={{ popper: { modifiers: [{ name: 'offset',options: {offset: [0, 10]} }] } }}
			>
				<CardContent sx={{ display: "flex",bgcolor: color.itemBgColor,cursor: "pointer" }} onClick={handleExpandClick}>
					<ul style={{listStyleType: "none",padding: 0}}>
						<Collapse in={expanded} unmountOnExit>
							<li><b>Specification</b> : {edu.specifications}</li>
							<li><b>Institution</b> : {edu.institution}</li>
							<li><b>Location</b> : {edu.location}</li>
							<li><b>Duration</b> : {edu.duration}</li>
						</Collapse>
						<li><b>Score</b> : {edu.score}</li>
					</ul>
					<ExpandMore
			          expand={expanded}	    
			          aria-expanded={expanded}
			          aria-label="show more"
			        >
			          <ExpandMoreIcon />
			        </ExpandMore>
				</CardContent>
			</Tooltip>
		</Card>
	)
}

export default Works;