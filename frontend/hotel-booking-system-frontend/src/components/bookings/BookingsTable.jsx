import React, {useEffect, useState} from 'react';
import {parseISO} from "date-fns";
import DateSlider from "../common/DateSlider.jsx";
import moment from "moment/moment.js";

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        // console.log("filteredBookings", startDate, endDate)

        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate
                    && bookingEndDate <= endDate
                    && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo]);

    return (
        <section className={"p-4"}>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
            <table className={"table table-bordered table-hover shadow"}>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check in Date</th>
                        <th>Check out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guests</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>

                <tbody className={"text-center"}>
                {filteredBookings.map((booking, index) => {
                    console.log("Booking Data:", booking); // Debugging

                    return(
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.id}</td>
                        <td>{booking.roomResponse?.id || "N/A"}</td>
                        <td>{booking.roomResponse?.roomType || "N/A"}</td>
                        <td>{moment(booking.checkInDate).format("MMM Do YYYY")}</td>
                        <td>{moment(booking.checkInDate).format("MMM Do YYYY")}</td>
                        <td>{booking.guestFullName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numOfAdults}</td>
                        <td>{booking.numOfChildren}</td>
                        <td>{booking.totalNumOfGuests}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td>
                            <button
                                className={"btn btn-danger btn-sm"}
                                onClick={() => handleBookingCancellation(booking.id)}
                            >
                                Cancel Booking
                            </button>
                        </td>
                    </tr>
                )
                })}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p> No booking found for the selected dates </p>}
        </section>
    );
};

export default BookingsTable;
