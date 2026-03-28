import React, {useEffect, useState} from 'react';
import {getRoomById} from "../utils/ApiFunctions.js";
import {useParams} from "react-router-dom";
import {FaCheckCircle} from "react-icons/fa";
import BookingForm from "./bookingForm.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";

const Checkout = () => {
    const[error, setError] = useState("")
    const[isLoading, setIsLoading] = useState(true)
    const[roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice: ""})

    const {roomId} = useParams();

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId).then((response) => {
                setRoomInfo(response);
                setIsLoading(false)
            }) .catch((error) => {
                setError(error)
                setIsLoading(false)
            })
        }, 2000)
    }, [roomId]);

    return (
        <div>
            <section className={"container"}>
                <div className={"row flex-column flex-md-row align-items-center"}>
                    <div className={"col-md-4 mt-5 mb-5"}>
                        {isLoading ? (
                            <p>Loading room information</p>
                        ):error?(
                            <p>{error}</p>
                        ):(
                            <div className={"room-info"}>
                                <img src={`data:image/png;base64,${roomInfo.photo}`}
                                     alt={"room photo"}
                                        style={{width: "100%", height: "200px"}}
                                />
                                <table className={"table table-bordered"}>
                                   <tbody>
                                        <tr>
                                            <th>Room Type:</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Price:</th>
                                            <td>{"$" + roomInfo.roomPrice}</td>
                                        </tr>

                                       <tr>
                                           <th>Room Services: </th>
                                             <td>
                                                 <ul className={"list-unstyled d-flex flex-wrap gap-2"}>
                                                     {roomInfo.amenities && roomInfo.amenities.length > 0 ? (
                                                         roomInfo.amenities.map((amenity, index) => (
                                                             <li key={index} className="badge bg-info text-dark p-2 d-flex align-items-center">
                                                                 <FaCheckCircle className="me-2 text-success" />
                                                                 {amenity}
                                                             </li>
                                                         ))
                                                     ) : (
                                                         <li className="text-muted">No specific amenities listed</li>
                                                     )}
                                                 </ul>
                                             </td>
                                       </tr>
                                   </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className={"col-md-8"}>
                        <BookingForm/>
                    </div>
                </div>
            </section>
            <div className={"container"}>
                <RoomCarousel/>
            </div>
        </div>
    );
};

export default Checkout;
