import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const ReactQuillEditor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            // ['code-block'],
        ],
    };

    return (
        <Wrapper>
            <ReactQuill
                modules={modules}
                theme='snow'
                value={value}
                onChange={onChange}
            />
        </Wrapper>
    );
};

export default ReactQuillEditor;

const Wrapper = styled.div`
    height: 100% !important; // add this line
    width: 100%;
    display: flex;

    .quill {
        max-height: 100% !important;
    }

    .ql-container {
        overflow-y: auto;
        border-radius: 0 0 8px 8px !important;
        max-height: 100% !important;
        justify-self: stretch;
    }

    .ql-toolbar {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--white) !important;
        border-radius: 8px 8px 0 0 !important;
        justify-self: start;
    }

    .ql-editor {
        min-height: 200px;
        border-radius: 8px 8px 8px 8px !important;

        // TODO HOW CAN I FIX REACT QUILL HEIGHT TO BE A %?
        max-height: 100%;

        font-size: 1rem !important;

        ul {
            padding-bottom: 1rem !important;
            padding-left: 0;
            list-style-type: circle !important;
        }

        p {
            color: var(--black) !important;
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
`;
