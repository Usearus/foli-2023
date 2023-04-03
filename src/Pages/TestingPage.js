import { useState, useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DatabaseContext } from '../context/DatabaseContext';
import { openai } from '../API/gpt';

const TestingPage = () => {
    const [responses, setResponses] = useState([]);
    const { userProfile } = useContext(DatabaseContext);
    const promptRef = useRef();

    const handleResponse = async () => {
        const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader =
            function newSetRequestHeader(key, val) {
                if (key.toLocaleLowerCase() === 'user-agent') {
                    return;
                }
                setRequestHeader.apply(this, [key, val]);
            };
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `I want you to act like a career coach that helps people land their dream job. I want you to craft a single well written bullet point acheviement for my resume. Please send only the solution and add a metric if possible. Base it on:  ${promptRef.current.value}. My role is ${userProfile.position}`,
            top_p: 1.0,
        });
        console.log('response from ChatGPT:', response.prompt);
        setResponses([...responses, response]);
    };

    return (
        <>
            <h1>Testing Page</h1>
            <hr />
            <Form>
                <Form.Label>Enter Prompt</Form.Label>
                <Form.Group className='mb-3' controlId='prompt'>
                    <Form.Control
                        type='text'
                        placeholder='Google, Apple, etc.'
                        ref={promptRef}
                    />
                </Form.Group>
                <Button variant='outline-primary' onClick={handleResponse}>
                    Edit
                </Button>
            </Form>

            <p>
                {responses.map((response, index) => (
                    <li key={index}>{response.data.choices[0].text}</li>
                ))}
            </p>
        </>
    );
};

export default TestingPage;
