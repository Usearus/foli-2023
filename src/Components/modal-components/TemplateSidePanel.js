import SidePanel from './SidePanel';

const TemplateSidePanel = ({ isOpen, onClose }) => {
	return (
		<SidePanel isOpen={isOpen} onClose={onClose} title='Templates'>
			<div className='w-full h-full flex flex-col'>
				<p>test</p>
			</div>
		</SidePanel>
	);
};

export default TemplateSidePanel;
