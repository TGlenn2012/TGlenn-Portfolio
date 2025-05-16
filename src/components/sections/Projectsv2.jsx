import React from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { RevealOnScroll } from "../RevealOnScroll";
import { ProjectCard } from "../ProjectCard";
import logo from "/assets/images/color-sharp2.png";
import projImg1 from "/assets/images/project-img1.png";
import projImg2 from "/assets/images/project-img2.png";
import projImg3 from "/assets/images/project-img3.png";
import colorSharp2 from "/assets/images/color-sharp2.png";


export const Projects = () => {
    const projects = [
        {
            title: "MicrokARts",
            description: "A microcontroller-based kart racing game that uses augmented reality to enhance the gaming experience.",
            image: projImg1, // Use the imported project image
        },
        {
            title: "ShARed IoT",
            description: "Description for project 2.",
            image: projImg2, // Use the imported project image
        },
        {
            title: "IoTMaker",
            description: "Description for project 3.",
            image: projImg3, // Use the imported project image
        }
    ];

    return (
        <section className="projects" id="projects">
            <RevealOnScroll>
                <Container>
                    <Row>
                        <Col>
                            <h2> Projects </h2>
                            <p> Here are some of my projects. </p>
                            <Tab.Container id="projects-tabs" defaultActiveKey="microkarts">
                                <Nav>
                                    <Nav.Item>
                                        <Nav.Link eventKey="microkarts">MicrokARts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="sharediot">ShARed IoT</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="iotmaker">IotMaker</Nav.Link>  
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="microkarts">
                                        <Row>
                                            {projects.map((project, index) => {
                                                return (
                                                    <ProjectCard
                                                        key={index}
                                                        title={project.title}
                                                        description={project.description}
                                                        image={project.image}
                                                    />
                                                )
                                            })}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="sharediot">
                                        <Row>
                                            {projects.map((project, index) => {
                                                return (
                                                    <p>
                                                        {project.title}
                                                    </p>
                                                )
                                            })}
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="iotmaker">
                                        <Row>
                                            {projects.map((project, index) => {
                                                return (
                                                    <p>
                                                        {project.title}
                                                    </p>
                                                )
                                            })}
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>    
                    </Row>   
                </Container>   
            </RevealOnScroll>
            <img className="background-image-right" src={colorSharp2} alt="logo"></img>
        </section>
    )
}