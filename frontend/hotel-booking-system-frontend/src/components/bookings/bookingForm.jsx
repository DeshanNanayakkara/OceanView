import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomById} from "../utils/ApiFunctions.js";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment.js";
import {Form, FormControl, FormGroup} from "react-bootstrap";
import BookingSummery from "./BookingSummery.jsx";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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
        roomPrice: "",
        bookings: []
    })

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const {roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const handleDateRangeChange = (item) => {
        setDateRange([item.selection]);
        setBooking({
            ...booking,
            checkInDate: moment(item.selection.startDate).format("YYYY-MM-DD"),
            checkOutDate: moment(item.selection.endDate).format("YYYY-MM-DD")
        });
        setErrorMessage("");
    };

    const getRoomDetailsById = async(roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomInfo(response)
            setRoomPrice(response.roomPrice)
        }catch (error){
            setErrorMessage(`Error while fetching room details: ${error.message}`)
        }
    }

    useEffect(() => {
        getRoomDetailsById(roomId)
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

    const getDisabledDates = () => {
        let disabledDates = [];
        if (roomInfo.bookings && roomInfo.bookings.length > 0) {
            roomInfo.bookings.forEach(b => {
                let start = moment(b.checkInDate);
                let end = moment(b.checkOutDate);
                while (start.isBefore(end)) {
                    disabledDates.push(start.toDate());
                    start.add(1, 'days');
                }
            });
        }
        return disabledDates;
    };

    const isCheckoutDateValid = () => {
        if (!booking.checkInDate || !booking.checkOutDate) {
            setErrorMessage("Please select a date range on the calendar.")
            return false
        }

        const disabled = getDisabledDates();
        let start = moment(booking.checkInDate);
        let end = moment(booking.checkOutDate);
        let hasConflict = false;

        let current = start.clone();
        while (current.isBefore(end)) {
            if (disabled.some(d => moment(d).isSame(current, 'day'))) {
                hasConflict = true;
                break;
            }
            current.add(1, 'days');
        }

        if (hasConflict) {
            setErrorMessage("Warning: One or more selected days are already booked. Please choose a different range.")
            return false
        }

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

                                <fieldset style={{border: "2px", padding: "10px"}}>
                                    <legend>Lodging period</legend>
                                    <div className={"row"}>
                                        <div className={"col-12 mb-3 d-flex justify-content-center flex-column align-items-center"}>
                                            <input type="hidden" required value={booking.checkInDate} />
                                            <input type="hidden" required value={booking.checkOutDate} />
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={handleDateRangeChange}
                                                moveRangeOnFirstSelection={false}
                                                ranges={dateRange}
                                                minDate={new Date()}
                                                disabledDates={getDisabledDates()}
                                                className="w-100 border rounded shadow-sm overflow-hidden"
                                            />
                                            {(!booking.checkInDate || !booking.checkOutDate) && (
                                                <div className="text-secondary mt-2 small">
                                                    Please select both a check-in and check-out date from the calendar.
                                                </div>
                                            )}
                                            {errorMessage &&
                                                <p className={"error-message text-danger mt-2 fw-bold"}>
                                                    {errorMessage}
                                                </p>
                                            }
                                        </div>
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


