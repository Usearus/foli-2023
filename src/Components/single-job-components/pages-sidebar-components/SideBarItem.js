import { useContext, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styled from 'styled-components';
import { supabase } from '../../../API/supabase';
import { DatabaseContext } from '../../../context/DatabaseContext';
import ModalDeleteConfirmation from '../../modal-components/ModalDeleteConfirmation';

const SideBarItem = ({ page, setShowOffcanvas, showOffcanvas }) => {
	const { fetchCurrentPages, currentJob, setSelectedPageID } =
		useContext(DatabaseContext);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleVisibilityClick = async () => {
		const visible = page.visible;
		await supabase
			.from('pages')
			.update({
				visible: !visible,
			})
			.eq('id', page.id);
		fetchCurrentPages(currentJob);
	};

	// Will close any modal opened by the dropdown
	const handleCloseModal = () => {
		setShowDeleteModal(false);
	};

	// Will handle any modal option selected
	const handleDeleteModal = () => {
		setShowDeleteModal(true);
	};

	const handleSideBarItemClick = () => {
		setSelectedPageID(page.id);
		if (showOffcanvas === true) {
			setShowOffcanvas(false);
		}
	};

	return (
		<Wrapper>
			<div className='parent-btn'>
				<OverlayTrigger
					key='title'
					placement='top'
					delay={{ show: 1000, hide: 0 }}
					overlay={<Tooltip id={`tooltip-${page.id}`}>{page.title}</Tooltip>}>
					<span onClick={handleSideBarItemClick}>{page.title}</span>
				</OverlayTrigger>
				{page.locked ? (
					''
				) : (
					<>
						<div
							className='ms-auto fade-in'
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minWidth: '24px',
								minHeight: '24px',
							}}
							onClick={handleDeleteModal}>
							<RiDeleteBin6Line
								className='show-on-hover'
								style={{
									minWidth: '16px',
									minHeight: '16px',
									cursor: 'pointer',
									color: 'var(--grey-600)',
								}}
							/>
						</div>
					</>
				)}
				<div
					className='ms-auto'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minWidth: '24px',
						minHeight: '24px',
					}}
					onClick={handleVisibilityClick}>
					{page.visible ? (
						<BiShow
							style={{
								minWidth: '16px',
								minHeight: '16px',
								cursor: 'pointer',
								color: 'var(--grey-600)',
							}}
						/>
					) : (
						<BiHide
							style={{
								minWidth: '16px',
								minHeight: '16px',
								cursor: 'pointer',
								color: 'var(--grey-600)',
							}}
						/>
					)}
				</div>
				{showDeleteModal && (
					<ModalDeleteConfirmation
						show={showDeleteModal}
						close={handleCloseModal}
						object={page}
						type='page'
					/>
				)}
			</div>
		</Wrapper>
	);
};

export default SideBarItem;

const Wrapper = styled.div`
	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 85%;
		text-align: left;
	}
	.parent-btn {
		display: flex;
		align-items: center;
		width: 100%;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		/* Padding is weird to offset the draggable container box */
		padding: 4px 7px;
		color: var(--grey-900);
	}

	.parent-btn:hover {
		display: flex;
		align-items: center;
		width: 100%;
		background: var(--grey-300);
	}

	.parent-btn:active {
		background: var(--grey-400);
	}

	.fade-in {
		opacity: 0;
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	:hover .fade-in {
		opacity: 1;
	}

	// Mobile
	@media (max-width: 576px) {
		.parent-btn {
			padding: 0.75rem;
		}
		.fade-in {
			opacity: 1;
		}
	}
`;
