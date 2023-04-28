import { useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';

const ReactQuillEditor = ({ value, onChange }) => {
	const editor = useRef(null);

	const handleOnFocus = () => {
		if (editor.current) {
			const quill = editor.current.getEditor();
			quill.format('size', '14px'); // set default font size
		}
	};

	const fontSizeArr = [
		'8px',
		'9px',
		'10px',
		'12px',
		'14px',
		'16px',
		'20px',
		'24px',
		'32px',
		'42px',
		'54px',
		'68px',
		'84px',
		'98px',
	];

	var Size = Quill.import('attributors/style/size');
	Size.whitelist = fontSizeArr;
	Quill.register(Size, true);

	// const fontWhitelist = ['Ubuntu', 'Raleway', 'Roboto'];
	// var Font = Quill.import('formats/font');
	// Font.whitelist = fontWhitelist;
	// Quill.register(Font, true);

	const modules = {
		toolbar: [
			// [{ 'font': Font.whitelist }],
			[{ header: [1, 2, false] }],
			[{ size: fontSizeArr }],
			['bold', 'italic', 'underline'],
			[],
			[{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
			// [{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ color: [] }, { background: [] }, 'clean'],
			['link'],
		],
	};

	return (
		<Wrapper>
			<ReactQuill
				modules={modules}
				theme='snow'
				value={value}
				onChange={onChange}
				ref={editor}
				onFocus={handleOnFocus}
				placeholder='Start typing content...'
			/>
		</Wrapper>
	);
};

export default ReactQuillEditor;

const Wrapper = styled.div`
	.ql-container {
		border-radius: 0 0 8px 8px !important;
		/* padding-left: 0rem; */
	}

	.ql-toolbar {
		position: sticky;
		top: 0;
		z-index: 1;
		background: var(--white) !important;
		border-radius: 8px 8px 0 0 !important;
	}

	.ql-editor ul > li::before {
		/* This prevents an odd content that was added by React-Quill */
		content: '';
	}

	.ql-editor {
		min-height: 200px;
		border-radius: 8px 8px 8px 8px !important;
		font-size: 1rem !important;

		/* Set all color to secondary by default to be different than the standard colors in the app */
		* {
			color: var(--secondaryTextColor);
		}

		ul li {
			padding-bottom: 1rem !important;
			padding-left: 0;
			list-style-type: circle !important;
		}

		h1 {
			font-size: 1.8rem !important;
		}

		h2 {
			font-size: 1.25rem !important;
		}

		h3 {
			font-size: 1rem !important;
		}

		h4 {
			font-size: 1rem !important;
		}

		h5 {
			font-size: 1rem !important;
		}
	}

	.ql-snow {
		.ql-picker {
			&.ql-size {
				.ql-picker-label,
				.ql-picker-item {
					&::before {
						content: attr(data-value) !important;
					}
				}
			}
		}
	}
`;
