import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { Button, Modal } from 'react-bootstrap';
import foliImage from '../assets/Foli2023-Landing-Page-gif.gif';

const LoginPage = () => {
	const { loginWithRedirect } = useAuth0();
	const { isAuthenticated } = useAuth0();

	const [showPrivacy, setShowPrivacy] = useState(false);
	const [showTerms, setShowTerms] = useState(false);

	if (!isAuthenticated) {
		return (
			<>
				<div className='above-the-fold'>
					<div>
						<div className='left-container'>
							<div className='body-content'>
								<h1>
									Welcome to{' '}
									<span>
										fol<i>i</i>
									</span>
								</h1>
								<p>
									We are currently in alpha. Expected unpolished design and
									frequent bugs. Feedback & suggestions welcomed!
								</p>
								<button
									className='btn btn-primary'
									onClick={() => loginWithRedirect()}>
									Log In / Sign Up
								</button>
							</div>
							<p style={{ fontSize: 'small', maxWidth: '300px' }}>
								By logging into this website you agree to our
								<button
									className='btn btn-ghost'
									// onClick={() => setShowPrivacy(true)}
								>
									privacy policy
								</button>
								and{' '}
								<button
									className='btn btn-ghost'
									// onClick={() => setShowTerms(true)}
								>
									terms.
								</button>
							</p>
						</div>
					</div>
					<div className='right-container'>
						<div className='header-image'>
							<h2>
								<span>Simplify</span> your job search to one screen
							</h2>
							<img src={foliImage} alt='foliImage' />
						</div>
					</div>
				</div>
				{/* <div className='home-container'>
					<div></div>
				</div> */}
				{/* Privacy Policy Modal */}
				{/* <Modal
					scrollable
					show={showPrivacy}
					onHide={() => setShowPrivacy(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Privacy Policy</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Privacy Policy</h5>
						<p>
							This Privacy Policy describes how we collect, use, and protect the
							personal information of our users. By using our website, you
							consent to the terms of this Privacy Policy.
						</p>
						<h5>Information We Collect</h5>
						<p>
							We collect email in order to allow users to log in and
							authenticate their account using Auth0 platform. We collect
							personal information through the Auth0 sign-in to authorize your
							account.
						</p>
						<h5>Sharing of Information</h5>
						<p>
							We do not sell any personal information collected to third
							parties. Personal information is protected within the Auth0
							platform.
						</p>
						<h5>User Rights</h5>
						<p>
							Users can request to delete their data and personal information by
							emailing us at adamdenais@gmail.com.
						</p>
						<h5>Data Breach</h5>
						<p>
							In the event of a data breach or security incident involving the
							personal information that we collect, we will promptly notify
							affected users via email and take appropriate steps to address the
							issue. Data Retention We retain user data and personal information
							as long as the account is active or as needed to provide our
							services. Once the account is deleted, we will delete user data
							and personal information. Security We take reasonable steps to
							protect the personal information of our users. However, no method
							of transmission over the internet or electronic storage is
							completely secure.
						</p>
						<h5>Contact Us</h5>
						<p>
							If you have any questions or concerns about this Privacy Policy or
							our use of your personal information, please contact us at
							adamdenais@gmail.com.
						</p>
					</Modal.Body>
				</Modal> */}
				{/* Terms Modal */}
				{/* <Modal scrollable show={showTerms} onHide={() => setShowTerms(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Terms & Conditions</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{ maxWidth: '800px' }}>
						<p>
							Terms and Conditions Welcome to 'foli' (the "Website"). By using
							this Website, you agree to be bound by the following terms and
							conditions (the "Terms"). If you do not agree to these Terms, you
							may not use the Website. Prohibited Actions You agree not to use
							the Website for any of the following purposes: To engage in any
							activity that is illegal, harmful, or interferes with the rights
							of others. To post or transmit any material that is unlawful,
							abusive, defamatory, obscene, or offensive. To interfere with the
							operation of the Website or any other user's use of the Website.
							To attempt to gain unauthorized access to any part of the Website
							or any user's account. To use any automated means, including bots,
							spiders, or scrapers, to access the Website. User-Generated
							Content Users of the Website may submit resumes, job applications,
							or other content ("User Content"). By submitting User Content, you
							agree that: You have the right to submit the User Content and that
							it does not infringe the rights of any third party. You grant us a
							non-exclusive, transferable, sub-licensable, royalty-free,
							worldwide license to use, copy, modify, distribute, and display
							the User Content. We may remove any User Content that violates
							these Terms or for any other reason at our sole discretion.
							Limitation of Liability The Website is provided "as is" and we
							make no warranties or representations about the Website or its
							content. We shall not be liable for any damages arising from the
							use or inability to use the Website, or from any content or
							services provided through the Website. Dispute Resolution In the
							event of any dispute between you and us relating to these Terms or
							the Website, you agree to first attempt to resolve the dispute
							informally. If the dispute cannot be resolved informally, then you
							agree to submit to binding arbitration in accordance with the
							rules of the American Arbitration Association. Intellectual
							Property All content and materials on the Website, including
							trademarks, logos, and copyrights, are owned by us or our
							licensors. You may not use any of these materials without our
							prior written permission. Applicable Laws These Terms shall be
							governed by and construed in accordance with the laws of Texas. If
							any provision of these Terms is found to be invalid or
							unenforceable, the remaining provisions shall remain in full force
							and effect.
						</p>
					</Modal.Body>
				</Modal> */}
			</>
		);
	}
	return <Navigate to='/' />;
};

export default LoginPage;
