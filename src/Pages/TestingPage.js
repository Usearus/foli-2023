import { jsPDF } from 'jspdf';
import { Button } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';
import { useContext } from 'react';

const TestingPage = () => {
	const { allPages } = useContext(DatabaseContext);
	const myPage = allPages[6];

	if (myPage) {
		const content = myPage.content;
		// console.log('myPage', content);

		const handleExportPdf = () => {
			const doc = new jsPDF('p', 'px', 'letter');
			// const doc = new jsPDF();

			const options = {
				callback: function (doc) {
					doc.save(`page.pdf`);
				},
				// html2canvas: { scale: 0.3 },
				width: 400,
				windowWidth: 400,
				hotfixes: ['px_scaling'],
				margin: [10, 10, 10, 10],
			};

			doc.html(content, options);
		};

		return (
			<>
				<h3>Testing Page</h3>
				<hr />
				<p>{myPage.content}</p>
				<Button onClick={handleExportPdf}>Export PDF</Button>
			</>
		);
	}
};

export default TestingPage;
