import { useState, useContext, useRef } from "react";
import { Button, Form, Dropdown, Stack } from "react-bootstrap";
import { DatabaseContext } from "../context/DatabaseContext";
import styled from "styled-components";
import MarkdownView from "react-showdown";
import useAlert from "../Custom Hooks/useAlert";
import ReactQuillEditor from "./ReactQuillEditor";
import ModalDeleteConfirmation from "./ModalDeleteConfirmation";
import { FiMoreVertical } from "react-icons/fi";
import { AiFillEdit,AiOutlineClose } from "react-icons/ai";
import ModalEditPage from "./ModalEditPage";
import { supabase } from "../API/supabase";
import { Resizable } from "re-resizable";

const Page = (page) => {
  // Context Variables
  const { fetchCurrentPages, currentJob } = useContext(DatabaseContext);
  const { setAlert } = useAlert();

  // Modals

  // Modal Variables
  const [selectedEventKey, setSelectedEventKey] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditPageModal, setShowEditPageModal] = useState(false);
    
  const handleSelect = (eventKey) => {
    setSelectedEventKey(eventKey);
    if (eventKey === "1") {
      setShowDeleteModal(true);
      console.log("handleSelect called");
    }
  };

  const handleOpenPageModalClick = () => {
    setShowEditPageModal(true);
  };
  
  const handleCloseReset = () => {
    // Will close any modal opened by the dropdown
    console.log("handleCloseReset called");
    setShowDeleteModal(false);
  };





  // PAGE FUNCTIONS
  const initialVisibleValue = page.visible;
  const initialTitleValue = page.title ?? "";
      // Check width on load and render mobile or desktop pages
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  // Resizing
  const [pageWidth, setPageWidth] = useState(page.width);
  const handleUpdateWidthClick = async (newPageWidth) => {
    setPageWidth(newPageWidth);
    const { error } = await supabase
      .from("pages")
      .update({
        width: newPageWidth,
      })
      .eq("id", page.id);

    if (error) {
      setAlert("Something went wrong. Page width not updated.", "danger");
      console.log("error is", error);
      return;
    }
  };

  // EDITING PAGE FUNCTIONS
  const [editing, setEditing] = useState(false);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setContent(page.content);
    setEditing(false);
    setShowEditPageModal(false);
  };


  // React Quill Editor Variables & Functions
  const [content, setContent] = useState(page.content);

  
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleUpdateContentClick = async () => {
    const { error } = await supabase
      .from("pages")
      .update({
        content: content,
        title: titleRef.current.value,
      })
      .eq("id", page.id);
    setAlert("Page successfully updated!", "success");
    fetchCurrentPages(currentJob);
    setEditing(false);
    setShowEditPageModal(false);
    if (error) {
      setAlert("Something went wrong. Page not updated.", "danger");
      console.log("error is", error);
      return;
    }
  };

  // Editing Title
  const [title, setTitle] = useState(page.title)
  const titleRef = useRef();
  const [characterCount, setCharacterCount] = useState(title.length);
  const titleMaxChar = 32;

  const handleTitleChange = (event) => {
    const newValue = event.target.value;
    setCharacterCount(newValue.length);
  };






  return (
    <Wrapper>
      {initialVisibleValue === false ? (
        <></>
      ) : (
        <>
        {isMobile ? 
        (
          <div className="page-content pages-mobile">
            <header className="page-title">
              {/* {!editing ? ( */}
                <Stack direction="horizontal">
                  <h6>{page.title}</h6>
                  <Stack direction="horizontal" className="ms-auto">
                    <Button
                      variant="light"
                      style={{
                        background: "var(--white)",
                        border: 0,
                      }}
                      onClick={handleOpenPageModalClick}
                    >
                      <AiFillEdit />
                    </Button>
                    <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle
                        id="dropdown"
                        variant="link"
                        style={{
                          color: "var(--grey-800)",
                        }}
                      >
                        <FiMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">Delete page</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Stack>
                  {showEditPageModal && (
                    <ModalEditPage
                      showEditPageModal={showEditPageModal}
                      handleCancelClick={handleCancelClick}
                      page={page}
                      content={content}
                      setContent={setContent}
                      initialTitleValue={initialTitleValue}
                      titleRef={titleRef}
                      titleMaxChar={titleMaxChar}
                      handleTitleChange={handleTitleChange}
                      characterCount={characterCount}
                      handleUpdateContentClick={handleUpdateContentClick}
                      handleEditorChange={handleEditorChange}
                    />
                  )}
                  {showDeleteModal && (
                    <ModalDeleteConfirmation
                      show={showDeleteModal}
                      close={handleCloseReset}
                      object={page}
                      type="page"
                    />
                  )}
                </Stack>
            </header>
            <hr />

            {!editing ? (
              <MarkdownView
                className="page-scroll markdown-content"
                markdown={page.content}
              />
            ) : (
              <Form className="page-scroll">
                <Form.Group controlId="content">
                  <ReactQuillEditor
                    value={content}
                    onChange={handleEditorChange}
                  />
                </Form.Group>
              </Form>
            )}
          </div> 
          ) : ( 
            <Resizable
            className="page-content shadow-on"
            minWidth="300px"
            maxWidth="700px"
            size={{
              height: "100%",
              width: pageWidth,
            }}
            onResizeStop={(e, direction, ref, d) => {
              const newPageWidth = pageWidth + d.width;
              handleUpdateWidthClick(newPageWidth);
            }}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
          >
            <header className="page-title">
              {!editing ? (
                <Stack direction="horizontal">
                  <h6>{page.title}</h6>
                  <Stack direction="horizontal" className="ms-auto">
                    <Dropdown className="fade-in" onSelect={handleSelect}>
                      <Button
                        variant="light"
                        style={{
                          background: "var(--white)",
                          border: 0,
                        }}
                        onClick={handleEditClick}
                      >
                        <AiFillEdit />
                      </Button>

                      <Dropdown.Toggle
                        id="dropdown"
                        variant="link"
                        style={{
                          color: "var(--grey-800)",
                        }}
                      >
                        <FiMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">Delete page</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Stack>
                  {showDeleteModal && (
                    <ModalDeleteConfirmation
                      show={showDeleteModal}
                      close={handleCloseReset}
                      object={page}
                      type="page"
                    />
                  )}
                </Stack>
              ) : (
                <div>
                  <Stack direction="horizontal" gap="1">
                    <Form>
                      <Form.Group className="title-field" controlId="title">
                        <Form.Control
                          type="text"
                          required
                          ref={titleRef}
                          defaultValue={initialTitleValue}
                          placeholder="Add page title"
                          size="md"
                          maxLength={titleMaxChar}
                          onChange={handleTitleChange}
                        />
                      </Form.Group>
                    </Form>
                    <div className="character-count">
                      {characterCount}/{titleMaxChar}
                    </div>
                    <Button
                      variant="light"
                        style={{
                          background: "var(--white)",
                          border: 0,
                        }}
                        className="ms-auto"
                      onClick={handleCancelClick}
                    >
                      <AiOutlineClose/>
                    </Button>
                  </Stack>
                </div>
              )}
            </header>
            <hr />

            {!editing ? (
              <MarkdownView
                className="page-scroll markdown-content"
                markdown={page.content}
              />
            ) : (
              <>
              <Form className="page-scroll">
                <Form.Group controlId="content">
                  <ReactQuillEditor
                    value={content}
                    onChange={handleEditorChange}
                  />
                </Form.Group>
              </Form>
              <div className="page-footer">
                    <Button
                      variant="primary"
                      onClick={handleUpdateContentClick}
                      // className="ms-auto"
                    >
                      Save
                    </Button>
                    </div>
                    </>
            )}
            </Resizable>
            
            )
            } 
            </> 
      )
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  .page-title {
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .page-title h6 {
    margin-bottom: 0rem;
    font-weight: 600;
    margin: 0 1rem;
  }

  hr {
    margin: 0 1.5rem;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background: var(--white);
  }

  .character-count {
    font-style: italic;
    font-size: small;
  }

  .page-scroll {
    overflow-y: auto;
    width: 98%;
    height: 100%;
  }

  .page-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
  }
  .markdown-content {
    padding: 1rem 2rem;
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1rem;
    }

    h4 {
      font-size: 1rem;
    }

    h5 {
      font-size: 1rem;
    }
    p {
      margin-bottom: 0;
    }

    ul li {
      padding-bottom: 1rem !important;

      list-style-type: circle !important;
    }
  }

  // React Quill Customization for page Component only!

  .ql-container {
    border: none !important;
    padding: 0rem 1rem;
  }

  .ql-toolbar {
    border: none !important;
    padding: 1rem 1rem;
  }

  .fade-up {
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(10px);
  }

  :hover .fade-up {
    opacity: 1;
    transform: translateY(0);
  }

  :hover .fade-in {
    opacity: 1;
  }

  .shadow-on {
    box-shadow: var(--shadow-1);
    transition: box-shadow 1s ease;
  }

  :hover .shadow-on {
    box-shadow: 0px 5px 10px var(--grey-500);
  }

  .pages-mobile {
    width: 90vw;
    max-width: 500px;
  }
`;

export default Page;
