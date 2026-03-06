import React from "react";
import {Container} from "react-bootstrap";

const Parallax = () => {
    return (
        <div className={"parallax mb-5"}>
            <Container className={"text-center px-5 py-5 justify-content-center"}>
                <div className={"parallax-content animated-texts bounceIn "}>
                    <h2 className={"text-white"}>
                        Welcome to <span>Mount Hotel</span>
                    </h2>
                    <h4>We offer the best</h4>
                </div>
            </Container>
        </div>
    )
}

export default Parallax
