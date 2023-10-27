import sudokuSolverWebApp from '../assets/Sudoku Solver WebApp logo.png';
import myPortfolio from '../assets/my Portfolio logo.png';
import hackerNewsWebScraper from '../assets/Hacker News Web Scraper logo.png';

const projects = [
	{
		"title"		:	"Sudoku Solver WebApp",
		"image"		:	sudokuSolverWebApp,
		"shortDesc"	:	"A Webapp that solves any given sudoku.",
		"longDesc"	:	"This is a webapp that solves any given valid sudoku. This has many features like solve visualization, sudoku validity checker, dark mode, etc.",
		"skills"	:	["ReactJs", "NodeJs", "HTML5", "CSS3", "Javascript"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/Sudoku-Solver-WebApp",
							"Website"	:	"https://hash-0021.github.io/Sudoku-Solver-WebApp"
						}
	},
	{
		"title"		:	"Portfolio",
		"image"		:	myPortfolio,
		"shortDesc"	:	"My porfolio website showcasing all my skills and works.",
		"longDesc"	:	"This is my porfolio website. This showcases all my skills, projects, jobs, certifications and many more.",
		"skills"	:	["ReactJs", "NodeJs", "HTML5", "CSS3", "Javascript", "Flask", "Python"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/portfolio",
							"Website"	:	"https://hash21.pythonanywhere.com"
						}
	},
	{
		"title"		:	"Hacker News Web Scraper",
		"image"		:	hackerNewsWebScraper,
		"shortDesc"	:	"A python program that scrapes 'Hacker News' website.",
		"longDesc"	:	"This is a python program that scrapes 'Hacker News' website using 'BeautifulSoup' module and stores the top news in an Excel file (.xlsx format).\nThe 'Hacker News.xlsx' file is an output file created after running 'web_scrape_hn.py' file",
		"skills"	:	["Python"],
		"links"		:	{
							"GitHub"	:	"https://github.com/HASH-0021/Hacker-News-Web-Scraper"
						}
	},
]

export { projects };