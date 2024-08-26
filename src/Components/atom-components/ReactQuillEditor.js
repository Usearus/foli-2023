import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';

const ReactQuillEditor = ({ value, onChange }) => {
	const editor = useRef(null);

	const handleOnFocus = () => {
		if (editor.current) {
			const quill = editor.current.getEditor();
			quill.format('size', '16px'); // set default font size
		}
	};

	var Size = Quill.import('attributors/style/size');
	Quill.register(Size, true);

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline'],
			[],
			[{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
			[{ color: [] }, { background: [] }, 'clean'],
			['link'],
		],
	};

	return (
		<>
			<ReactQuill
				modules={modules}
				theme='snow'
				value={value}
				onChange={onChange}
				ref={editor}
				onFocus={handleOnFocus}
				placeholder='Start typing content...'
			/>
		</>
	);
};

export default ReactQuillEditor;
