import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const ReactQuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
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
  // React Quill Customization for SHEET Component only!

  /* TODO ADD FOCUS STATE STYLES FROM BS INTO REACT QUILL */
  /* .ql-editor:focus {
    border: 1px solid #007bff !important; 
     border-color: var(--input-focus-border-color) !important; 
  } */

  .ql-container {
    overflow-y: auto;
    border-radius: 0 0 8px 8px !important;
  }

  .ql-editor {
    min-height: 200px;
    border-radius: 8px 8px 8px 8px !important;
    // TODO HOW CAN I FIX REACT QUILL HEIGHT TO BE A %?
    // max-height: 700px;
  }

  .ql-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--white) !important;
    border-radius: 8px 8px 0 0 !important;
  }

  .ql-editor {
    font-size: 1rem !important;

    ul {
      padding-bottom: 1rem !important;
      list-style-type: circle !important;
    }

    h1 {
      font-size: 3.052rem !important;
    }

    h2 {
      font-size: 2.441rem !important;
    }

    h3 {
      font-size: 1.953rem !important;
    }

    h4 {
      font-size: 1.563rem !important;
    }

    h5 {
      font-size: 1.25rem !important;
    }
  }
`;
