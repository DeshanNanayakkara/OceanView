import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    let today = new Date();

    return (
        <footer className="bg-dark text-light py-3 text-center" style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1000
        }}>
            <Container>
                <Row>
                    <Col xs={12} md={12} className="text-center">
                        <p>&copy; {today.getFullYear()} Mount Hotel</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
