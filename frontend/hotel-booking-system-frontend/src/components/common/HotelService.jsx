import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import Header from "./Header.jsx";
import {FaClock, FaConciergeBell, FaDumbbell, FaParking, FaSwimmer, FaUtensils, FaWifi} from "react-icons/fa";

const HotelService = () => {
    return (
        <>
            <Container className={"mb-2"}>
                <Header title={"Our Services"}/>
                <Row>
                    <h4 className={"text-center"}>
                        Services at <span className={"hotel-color"}>Mount - </span>Hotel
                        <span className={"gap-2"}>
                            <FaClock/> - 24-Hour Service
                        </span>
                    </h4>
                </Row>
                <hr/>

                <Row xs={1} md={2} lg={3} className={"g-4 mt-2"}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaWifi/> WiFi
                                </Card.Title>
                                <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaUtensils/> Restaurant
                                </Card.Title>
                                <Card.Text>Enjoy delicious meals at our in-house restaurant with a variety of cuisines</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaSwimmer/> Swimming Pool
                                </Card.Title>
                                <Card.Text>Relax and unwind in our luxurious swimming pool with scenic views.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaDumbbell/> Fitness Center
                                </Card.Title>
                                <Card.Text>Stay fit during your stay with access to our fully-equipped gym.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaConciergeBell/> Room Service
                                </Card.Title>
                                <Card.Text>Order food and amenities anytime with our 24/7 room service.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className={"hotel-color"}>
                                    <FaParking/> Fitness Center
                                </Card.Title>
                                <Card.Text>Enjoy complimentary secure parking for your convenience.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HotelService;
