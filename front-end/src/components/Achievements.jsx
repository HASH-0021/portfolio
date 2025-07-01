import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { skills } from '../APIs/SkillsAPI';
import { certificates } from '../APIs/CertificatesAPI';

import color from '../Helpers/colors';
import './Achievements.css';

const Achievements = () => {

	return (
		<section id = "achievements-section">
			<Paper square={false} elevation={3} sx={{ mt:8,padding:"2% 5%",width:"75%",bgcolor:color.sectionBgColor }}>
				<h2>Software Skills</h2>
				<TableContainer component={Paper} sx={{ mx:{xs:"7.5%",sm:"12.5%"},my:4,width:{xs:"85%",sm:"75%"},border:"2px solid black" }}>
					<Table aria-label="simple table">
						<TableHead sx = {{ bgcolor: color.itemHeaderColor }}>
							<TableRow>
								<TableCell
									sx=
										{{
											borderRight: "1px solid black",
											borderBottomColor: "black",
											color:"black",
											textAlign:"center",
											fontWeight:"bold"
										}}
								>
									Category
								</TableCell>
								<TableCell
									sx=
										{{
											borderBottomColor: "black",
											color:"black",
											textAlign:"center",
											fontWeight:"bold"
										}}
								>
									Skills
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx = {{ bgcolor: color.itemBgColor }}>
							{
								skills.map((skill,idx) => (
								    <TableRow key={idx}>
										<TableCell
											component="th"
											scope="row"
											sx=
												{
													idx === skills.length-1 ?
													{
														borderBottom: 0,
														borderRight: "1px solid black",
														color: "black"
													} :
													{
														borderRight: "1px solid black",
														borderBottomColor: "black",
														color: "black"
													}
												}
										>
											{skill[0]}
										</TableCell>
										<TableCell
											sx=
												{
													idx === skills.length-1 ?
													{
														borderBottom: 0,
														color: "black"
													} :
													{
														borderBottomColor: "black",
														color: "black"
													}
												}
										>
											{skill[1]}
										</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<Paper square={false} elevation={3} sx={{ my:8,padding:"2% 5%",width:"75%",bgcolor:color.sectionBgColor }}>
				<h2>Certifications</h2>
				<div id = "certificates-wrapper">
					{certificates.map((certificate,idx) => <Certificate certificate={certificate} key={idx} />)}
				</div>
			</Paper>
		</section>
	)
}

const Certificate = ({ certificate }) => {
	return (
		<Card sx={{ mx:"auto",my:1,width:{md:"45%"},border: "solid black 2px" }}>
			<CardHeader title={certificate.course} sx={{ "& .MuiCardHeader-title": {fontSize: "1.2rem"},bgcolor: color.itemHeaderColor }} />
			<Divider sx={{ borderWidth: 1 }} />
			<CardContent sx={{ bgcolor: color.itemBgColor }}>
				{certificate.id !== null && <p><b>ID</b> : {certificate.id}</p>}
				<p><b>Skills</b> : {certificate.skills}</p>
				<CardActions sx={{ justifyContent:"center"}}>
					<Tooltip title="Go to this certificate url" arrow>
						<Button
							variant="contained"
							size="small"
							sx={{
									textTransform:"capitalize",
									transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,scale 250ms",
									"&:active": {scale: "0.95"}
								}}
							href={certificate.url}
							target="_blank"
							rel = "noopener noreferrer"
						>
							View Certificate
						</Button>
					</Tooltip>
				</CardActions>
			</CardContent>
		</Card>
	)
}

export default Achievements;