import screenTimeTracker from '../assets/Screen Time Tracker Icon.png';
import sudokuSolverWebApp from '../assets/Sudoku Solver WebApp logo.png';
import myPortfolio from '../assets/my Portfolio logo.png';
import dateTime from '../assets/DateTime logo.png';
import hackerNewsWebScraper from '../assets/Hacker News Web Scraper logo.png';

const projects = [
	{
		"title"		:	"Screen Time Tracker",
		"image"		:	screenTimeTracker,
		"shortDesc"	:	"An app to track the screen time of apps.",
		"longDesc"	:	"This app tracks screen time of all apps present on the device. It has many features like setting goals, persistent tracking notification, export and import app data, and dark mode.",
		"skills"	:	["React Native", "Java", "ReactJs", "JavaScript"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/screen_time_tracker"
						}
	},
	{
		"title"		:	"Sudoku Solver WebApp",
		"image"		:	sudokuSolverWebApp,
		"shortDesc"	:	"A webapp that solves any given sudoku.",
		"longDesc"	:	"This is a webapp that solves any given valid sudoku. This has many features like solve visualization, sudoku validity checker, dark mode, etc.",
		"skills"	:	["ReactJs", "NodeJs", "HTML5", "CSS3", "JavaScript"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/Sudoku-Solver-WebApp",
							"Website"	:	"https://hash-0021.github.io/Sudoku-Solver-WebApp"
						}
	},
	{
		"title"		:	"my Portfolio",
		"image"		:	myPortfolio,
		"shortDesc"	:	"My porfolio website showcasing all my skills and works.",
		"longDesc"	:	"This is my porfolio website. This showcases all my skills, projects, jobs, certifications and many more.",
		"skills"	:	["ReactJs", "NodeJs", "HTML5", "CSS3", "JavaScript", "Flask", "Python"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/portfolio",
							"Website"	:	"https://hash21.pythonanywhere.com"
						}
	},
	{
		"title"		:	"DateTime",
		"image"		:	dateTime,
		"shortDesc"	:	"A web-app with tools involving date and time.",
		"longDesc"	:	"This is a datetime web-app. This has various tools related to date and time such as stopwatch, timer, year status, etc.",
		"skills"	:	["ReactJs", "NodeJs", "HTML5", "CSS3", "JavaScript"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/datetime",
							"Website"	:	"https://hash-0021.github.io/datetime/"
						}
	},
	{
		"title"		:	"Hacker News Web Scraper",
		"image"		:	hackerNewsWebScraper,
		"shortDesc"	:	"A python program that scrapes 'Hacker News' website.",
		"longDesc"	:	"This is a python program that scrapes 'Hacker News' website using 'BeautifulSoup' module and stores the top news in an Excel file (.xlsx format).",
		"skills"	:	["Python"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/Hacker-News-Web-Scraper"
						}
	}
]

export { projects };