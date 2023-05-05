import { useContext, useState } from 'react';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';
import Form2ColField from '../Components/atom-components/Form2ColField';
import SnippetTextInput from '../Components/atom-components/SnippetTextInput';

const ResumeBuilderPage = () => {
	const { userResume, fetchUserResume, userProfile, fetchUserProfile } =
		useContext(DatabaseContext);
	const [editing, setEditing] = useState(false);

	if (!userResume) {
		return <></>;
	}

	if (userResume) {
		return (
			<Wrapper>
				<div className='component-container'>
					<h4 style={{ paddingBottom: '1rem' }}>Contact</h4>
					<Form2ColField
						label1='First Name'
						value1='firstName'
						label2='Last Name'
						value2='lastName'
						database='resumes'
						valueSource={userResume}
						fetchSource={fetchUserResume}
						editing={editing}
						setEditing={setEditing}
					/>

					<h4 style={{ paddingBottom: '1rem' }}>Snippets</h4>
					<h6 style={{ paddingBottom: '.5rem', paddingTop: '1rem' }}>
						Contact
					</h6>
					<SnippetTextInput
						label1='First Name'
						value1='firstName'
						database='resumes'
						valueSource={userResume}
						fetchSource={fetchUserResume}
					/>
					<SnippetTextInput
						label1='Last Name'
						value1='lastName'
						database='resumes'
						valueSource={userResume}
						fetchSource={fetchUserResume}
					/>
					<SnippetTextInput
						label1='Target Position'
						value1='position'
						database='profiles'
						valueSource={userProfile}
						fetchSource={fetchUserProfile}
					/>
					{/* <SnippetTextInput
						label1='Acheivements'
						value1='lastName'
						database='resumes'
						valueSource={userResume}
						fetchSource={fetchUserResume}
						textArea
					/> */}

					{/* <SnippetTextAreaInput
						label1='Last Name'
						value1='lastName'
						database='resumes'
						valueSource={userResume}
						fetchSource={fetchUserResume}
					/> */}
				</div>
			</Wrapper>
		);
	}
};

export default ResumeBuilderPage;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.component-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`;
