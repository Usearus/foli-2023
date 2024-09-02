import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import foliImage from '../assets/Foli2023-Landing-Page-gif.gif';
import Modal from '../Components/modal-components/Modal';

const LoginPage = () => {
	const { isAuthenticated } = useAuth0();
	const [showPrivacy, setShowPrivacy] = useState(false);
	const [showTerms, setShowTerms] = useState(false);

	if (!isAuthenticated) {
		return (
			<>
				{/* Privacy policy modal */}
				<Modal
					isOpen={showPrivacy}
					// scrollable
					onClose={() => setShowPrivacy(false)}
					title='Privacy policy'>
					<div>
						<h5>Privacy Policy</h5>
						<br />
						<p>
							This Privacy Policy describes how we collect, use, and protect the
							personal information of our users. By using our website, you
							consent to the terms of this Privacy Policy.
						</p>
						<br />
						<br />
						<h5>Information We Collect</h5>
						<br />
						<p>
							We collect email in order to allow users to log in and
							authenticate their account using Auth0 platform. We collect
							personal information through the Auth0 sign-in to authorize your
							account.
						</p>
						<br />
						<br />
						<h5>Sharing of Information</h5>
						<br />
						<p>
							We do not sell any personal information collected to third
							parties. Personal information is protected within the Auth0
							platform.
						</p>
						<br />
						<br />
						<h5>User Rights</h5>
						<br />
						<p>
							Users can request to delete their data and personal information by
							emailing us at adamdenais@gmail.com.
						</p>
						<br />
						<br />
						<h5>Data Breach</h5>
						<br />
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
						<br />
						<br />
						<h5>Contact Us</h5>
						<br />
						<p>
							If you have any questions or concerns about this Privacy Policy or
							our use of your personal information, please contact us at
							adamdenais@gmail.com.
						</p>
					</div>
				</Modal>

				{/* Terms modal */}
				<Modal
					isOpen={showTerms}
					// scrollable
					onClose={() => setShowTerms(false)}
					title='Terms & Conditions'>
					<div className='pb-4'>
						<p>
							Terms and Conditions of 'foli' (the "Website"). By using this
							Website, you agree to be bound by the following terms and
							conditions (the "Terms"). If you do not agree to these Terms, you
							may not use the Website.
						</p>
						<br />
						<br />
						<p>Prohibited Actions</p>
						<br />
						<p>
							You agree not to use the Website for any of the following
							purposes: To engage in any activity that is illegal, harmful, or
							interferes with the rights of others. To post or transmit any
							material that is unlawful, abusive, defamatory, obscene, or
							offensive. To interfere with the operation of the Website or any
							other user's use of the Website. To attempt to gain unauthorized
							access to any part of the Website or any user's account. To use
							any automated means, including bots, spiders, or scrapers, to
							access the Website.
						</p>
						<br />
						<br />
						<p>User-Generated Content </p>
						<br />
						<p>
							Users of the Website may submit resumes, job applications, or
							other content ("User Content"). By submitting User Content, you
							agree that: You have the right to submit the User Content and that
							it does not infringe the rights of any third party. You grant us a
							non-exclusive, transferable, sub-licensable, royalty-free,
							worldwide license to use, copy, modify, distribute, and display
							the User Content. We may remove any User Content that violates
							these Terms or for any other reason at our sole discretion.
						</p>
						<br />
						<br />
						<p>Limitation of Liability </p>
						<br />
						<p>
							The Website is provided "as is" and we make no warranties or
							representations about the Website or its content. We shall not be
							liable for any damages arising from the use or inability to use
							the Website, or from any content or services provided through the
							Website.
						</p>
						<br />
						<br />
						<p>Dispute Resolution </p>
						<br />
						<p>
							In the event of any dispute between you and us relating to these
							Terms or the Website, you agree to first attempt to resolve the
							dispute informally. If the dispute cannot be resolved informally,
							then you agree to submit to binding arbitration in accordance with
							the rules of the American Arbitration Association.
						</p>
						<br />
						<br />
						<p>Intellectual Property </p>
						<br />
						<p>
							All content and materials on the Website, including trademarks,
							logos, and copyrights, are owned by us or our licensors. You may
							not use any of these materials without our prior written
							permission.
						</p>
						<br />
						<br />
						<p>Applicable Laws</p> <br />
						<p>
							These Terms shall be governed by and construed in accordance with
							the laws of Texas. If any provision of these Terms is found to be
							invalid or unenforceable, the remaining provisions shall remain in
							full force and effect.
						</p>
					</div>
				</Modal>

				{/* Page Content */}
				<div className='flex flex-col h-full justify-between items-center p-4'>
					<div className='flex flex-col justify-center items-center'>
						<h2 className='text-2xl md:text-4xl pt-6 pb-4'>
							Simplify job interview management to one screen
						</h2>

						{/* Alert */}
						<div role='alert' className='alert w-fit flex'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='stroke-info h-6 w-6 shrink-0'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
							</svg>
							<p>Foli is in early access, so expect frequent bugs.</p>
						</div>

						{/* Gif */}
						<div className='py-10'>
							<img className='rounded-xl' src={foliImage} alt='foliImage' />
						</div>
					</div>

					{/* Bottom content */}
					<p>
						By logging in you agree to our{' '}
						<span
							className='link link-primary'
							onClick={() => setShowPrivacy(true)}>
							privacy policy
						</span>{' '}
						and{' '}
						<span
							className='link link-primary'
							onClick={() => setShowTerms(true)}>
							terms.
						</span>
					</p>
				</div>
			</>
		);
	}
	return <Navigate to='/' />;
};

export default LoginPage;
