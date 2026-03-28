import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    let today = new Date();
    const currentUser = localStorage.getItem("userId");

    return (
        <footer className="text-white py-3 px-3 text-center mt-auto" style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)"
        }}>
            <Container>
                <Row>
                    <Col xs={12} className="d-flex justify-content-center align-items-center flex-wrap gap-2 text-center" style={{fontSize: "0.95rem"}}>
                        <span>&copy; {today.getFullYear()} Ocean View Resort</span>
                        {currentUser && (
                            <>
                                <span className="d-none d-md-inline opacity-50">|</span>
                                <span className="fw-bold text-white">Logged in as: {currentUser}</span>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
