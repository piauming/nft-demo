import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';

const MintDateForm = ({ handleSubmit }) => {
    const [startDate, setStartDate] = useState("2023-02-26");
    const [endDate, setEndDate] = useState("2023-03-10");
   
    const handleChangeStartDate = (e) => {
        e.preventDefault()
        setStartDate(e.target.value);
    }

    const handleChangeEndDate = (e) => {
        e.preventDefault()
        setEndDate(e.target.value);
    }

    const prepareMintDate = (e) => {
        e.preventDefault();
        handleSubmit(startDate, endDate);
    }

    return (
        <Form onSubmit={prepareMintDate}>
            <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="text" placeholder="2023-02-26" value={startDate} onChange={handleChangeStartDate} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="text" placeholder="2023-03-10" value={endDate} onChange={handleChangeEndDate} />
            </Form.Group>

            <Button variant="primary" type="submit">Update Mint Dates</Button>
        </Form>
    );
}

export default MintDateForm;