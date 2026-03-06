import React from "react";
import MainHeader from "../layout/MainHeader.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";
import RoomSearch from "../common/RoomSearch.jsx";
import {useLocation} from "react-router-dom";

const Home = () => {
    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem("userId")

    return (
        <section>{/*{message && <p className={"text-warning px-5"}>{message}</p>}*/}
            {currentUser && (
                <div className="d-flex justify-content-center mt-0">
                    <h6 className={"text-success"}>You are logged in as {currentUser}</h6>
                </div>
            )}
            <MainHeader/>
                <section className={"container"}>
                    <RoomSearch/>
                    <RoomCarousel/>
                    <Parallax/>
                    <RoomCarousel/>
                    <HotelService/>
                    <Parallax/>
                    <RoomCarousel/>
                </section>
        </section>
    )
}

export default Home;
