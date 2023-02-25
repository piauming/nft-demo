import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';

const MetaDataForm = ({ handleSubmit }) => {
    const [nameValue, setNameValue] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState("");

    const handleNameChange = (e) => {
        e.preventDefault()
        setNameValue(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        e.preventDefault()
        setDescription(e.target.value);
    }

    const handleImageUriChange = (e) => {
        e.preventDefault()
        setImageUri(e.target.value);
    }

    const prepareMetaData = (e) => {
        e.preventDefault();
        if (nameValue.trim().length > 0 && description.trim().length && imageUri.trim().length) {
            const metadata = [nameValue, description, imageUri];
            handleSubmit(metadata);
        }
    }

    return (
        <Form onSubmit={prepareMetaData}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={nameValue} onChange={handleNameChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImageUri">
                <Form.Label>ImageURI</Form.Label>
                <Form.Control type="text" placeholder="Enter image uri" value={imageUri} onChange={handleImageUriChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default MetaDataForm;