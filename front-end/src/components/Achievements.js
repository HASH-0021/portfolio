import { skills } from '../APIs/SkillsAPI';
import { certificates } from '../APIs/CertificatesAPI';
import './Achievements.css';

const Achievements = () => {

	const getCertificate = (certificate,idx) => {
		return (
			<div className = "certificate" key = {idx}>
				<h4>{certificate.course}</h4>
				<div className = "certificate-description">
					<p>URL : <a href = {certificate.url}>{certificate.url}</a></p>
					<p>ID : {certificate.id}</p>
					<p>Skills : {certificate.skills}</p>
				</div>
			</div>
		)
	}

	return (
		<div id = "achievements-section">
			<div id = "software-skills">
				<h2>Software Skills</h2>
				<div className = "skills-table-container">
					<table>
						<thead>
							<tr>
								<th>Category</th>
								<th>Skills</th>
							</tr>
						</thead>
						<tbody>
							{
								skills.map((skill,idx) => {
									return (
										<tr key = {idx}>
											<td>{skill[0]}</td>
											<td>{skill[1]}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
			<div id = "certifications">
				<h2>Certifications</h2>
				<div id = "certificates-wrapper">
					{certificates.map((certificate,idx) => getCertificate(certificate,idx))}
				</div>
			</div>
		</div>
	)
}

export default Achievements;