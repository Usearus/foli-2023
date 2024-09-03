import SidePanel from './SidePanel';
import { EnvelopeClosedIcon, FileTextIcon } from '@radix-ui/react-icons';
const TemplateSidePanel = ({ isOpen, onClose }) => {
	return (
		<SidePanel isOpen={isOpen} onClose={onClose} title='Templates'>
			<div role='tablist' className='tabs tabs-bordered'>
				{/* Section 3 */}
				<input
					type='radio'
					name='templates'
					role='tab'
					className='tab'
					aria-label='Documents'
					defaultChecked
				/>
				<div role='tabpanel' className='tab-content pt-6'>
					{/* Section 1 */}
					<div className='join join-vertical w-full '>
						{/* Accordians */}
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' defaultChecked />
							<div className='collapse-title flex gap-2 items-baseline'>
								Resume <span className='text-sm'>(2)</span>
							</div>
							<div className='collapse-content flex flex-col gap-4'>
								{/* Card 1 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Template title
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Template explainer text before user interacts to see more.
										</p>
									</div>
								</div>
								{/* Card 2 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Template title
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Template explainer text before user interacts to see more.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Cover letter <span className='text-sm'>(2)</span>
							</div>
							<div className='collapse-content flex flex-col gap-4'>
								{/* Card 1 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Template title
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Template explainer text before user interacts to see more.
										</p>
									</div>
								</div>
								{/* Card 2 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Template title
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Template explainer text before user interacts to see more.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Section 1 */}
				<input
					type='radio'
					name='templates'
					role='tab'
					className='tab'
					aria-label='Email'
				/>
				<div role='tabpanel' className='tab-content pt-6'>
					{/* Section 1 */}
					<div className='join join-vertical w-full '>
						{/* Accordians */}
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' defaultChecked />
							<div className='collapse-title flex gap-2 items-baseline'>
								Applying <span className='text-sm'>(2)</span>
							</div>
							<div className='collapse-content flex flex-col gap-4'>
								{/* Card 1 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Request recommendation letter
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Email asking a reference to write a recommendation letter
											for your application.
										</p>
										{/* <div className='card-actions justify-end mt-1'>
									<div className='badge badge-outline'>Email</div>
									<div className='badge badge-outline'>Application</div>
								</div> */}
									</div>
								</div>
								{/* Card 2 */}
								<div className='card card-compact	bg-base-100 w-full shadow-md rounded-lg'>
									<div className='card-body'>
										<h2 className='card-title text-lg'>
											Submit a job application
											<div className='badge badge-primary'>NEW</div>
										</h2>
										<p>
											Email to apply for a job, and submit a resume and cover
											letter.
										</p>
										{/* <div className='card-actions justify-end mt-1'>
									<div className='badge badge-outline'>Email</div>
									<div className='badge badge-outline'>Application</div>
								</div> */}
									</div>
								</div>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Interviewing <span className='text-sm'>(6)</span>
							</div>
							<div className='collapse-content'>
								<p>Test</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Negotiating <span className='text-sm'>(3)</span>
							</div>
							<div className='collapse-content'>
								<p>Test</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Researching <span className='text-sm'>(2)</span>
							</div>
							<div className='collapse-content'>
								<p>Test</p>
							</div>
						</div>
					</div>
				</div>

				{/* Section 2 */}
				<input
					type='radio'
					name='templates'
					role='tab'
					className='tab'
					aria-label='Strategy'
				/>
				<div role='tabpanel' className='tab-content pt-6'>
					{/* Section 2 */}
					<div className='join join-vertical w-full '>
						{/* Accordians */}
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' defaultChecked />
							<div className='collapse-title flex gap-2 items-baseline'>
								Interview prep <span className='text-sm'>(5)</span>
							</div>
							<div className='collapse-content flex flex-col gap-4'>
								<p>Test</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Negotiating <span className='text-sm'>(1)</span>
							</div>
							<div className='collapse-content'>
								<p>Test</p>
							</div>
						</div>
						<div className='collapse collapse-arrow join-item bg-base-200'>
							<input type='radio' name='my-accordion-2' />
							<div className='collapse-title flex gap-2 items-baseline'>
								Researching <span className='text-sm'>(1)</span>
							</div>
							<div className='collapse-content'>
								<p>Test</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SidePanel>
	);
};

export default TemplateSidePanel;
