import React from 'react';
import { Col } from 'react-bootstrap';

export const ProjectCard = ({ title, description, image }) => {
    return (
        <Col sm={6} md={4}>
            <div className="proj-imgbx">
                <img src={image} alt={title} />
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
            </div>
        </Col>
    );
};