import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomById} from "../utils/ApiFunctions.js";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment.js";
import {Form, FormControl, FormGroup} from "react-bootstrap";
import BookingSummery from "./BookingSummery.jsx";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)

    const currentUser = localStorage.getItem("userId")

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: 1,
        numOfChildren: 0,
    })

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async(roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        }catch (error){
            setErrorMessage(`Error while getRoomPriceById: ${error.message}`)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const price = roomPrice ? roomPrice : 0
        return price * diffInDays
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numOfAdults, 20)
        const childrenCount = parseInt(booking.numOfChildren, 20)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckoutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check out date must be after check in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestValid() || !isCheckoutDateValid()) {
            e.stopPropagation()
        }else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async() => {
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", {state:{message : confirmationCode}})
        }catch (error){
            setErrorMessage(error.message)
            navigate("/booking-success", {state: {error: error.message}})
        }
    }

    return (
        <>
            <div className={"container mb-5"}>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <div className={"card card-body mt-5"}>
                            <h4 className={"card card-title"}>Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor={"guestFullName"}>
                                        Full Name :
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type={"text"}
                                        id={"guestFullName"}
                                        name={"guestFullName"}
                                        value={booking.guestFullName}
                                        placeholder={"Guest Name"}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor={"guestEmail"}>
                                        Email :
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type={"text"}
                                        id={"guestEmail"}
                                        name={"guestEmail"}
                                        value={booking.guestEmail}
                                        placeholder={"Guest Email"}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>
                                        Please enter your Email
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{border: "2px"}}>
                                    <legend>Lodging period</legend>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <Form.Label htmlFor={"checkInDate"}>
                                                Check in Date :
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type={"date"}
                                                id={"checkInDate"}
                                                name={"checkInDate"}
                                                value={booking.checkInDate || ""}
                                                placeholder={"Check in Date"}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback>
                                                Please enter check in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className={"col-md-6"}>
                                            <Form.Label htmlFor={"checkOutDate"}>
                                                Check out Date :
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type={"date"}
                                                id={"checkOutDate"}
                                                name={"checkOutDate"}
                                                value={booking.checkOutDate || ""}
                                                placeholder={"Check out Date"}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback>
                                                Please enter check out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage &&
                                            <p className={"error-message text-danger"}>
                                                {errorMessage}
                                            </p>
                                        }
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <Form.Label htmlFor={"nerOfAdults"}>
                                                Adults :
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type={"number"}
                                                id={"numOfAdults"}
                                                name={"numOfAdults"}
                                                value={booking.numOfAdults}
                                                placeholder={"0"}
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback>
                                                Please Enter at least 1 Adult
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <Form.Label htmlFor={"numOfChildren"}>
                                                Children :
                                            </Form.Label>
                                            <FormControl
                                                type={"number"}
                                                id={"numOfChildren"}
                                                name={"numOfChildren"}
                                                value={booking.numOfChildren}
                                                placeholder={"0"}
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <div className={"form-group mt-2 mb-2"}>
                                    <button type={"submit"} className={"btn btn-hotel"}>
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className={"col-md-4"}>
                        {isSubmitted && (
                            <BookingSummery
                            booking={booking}
                            payment={calculatePayment()}
                            isFormValid={isValidated}
                            onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;


