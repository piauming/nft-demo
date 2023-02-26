import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';

const MetaDataForm = ({ handleSubmit }) => {
    const [tokenUri, setTokenUri] = useState("");
   
    const handleChange = (e) => {
        e.preventDefault()
        setTokenUri(e.target.value);
    }

    const prepareMetaData = (e) => {
        e.preventDefault();
        if (tokenUri.trim().length > 0) {
            handleSubmit(tokenUri);
        }
    }

    return (
        <Form onSubmit={prepareMetaData}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>TokenUri</Form.Label>
                <Form.Control type="text" placeholder="Enter tokenUri" value={tokenUri} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default MetaDataForm;