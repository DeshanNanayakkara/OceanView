import React from "react";

const MainHeader = () => {
    return(
        <header className={"header-banner"}>
            <div className={"overlay"}>
                <div className={"animated-texts overlay-content"}>
                    <h1 className="header-title mb-3">
                        Welcome to <span className="hotel-color">Ocean View Resort</span>
                    </h1>
                    <h4 className="fs-3 fw-light text-white opacity-75">
                        Experience the ultimate luxury
                    </h4>
                </div>
            </div>
        </header>
    )
}

export default MainHeader
