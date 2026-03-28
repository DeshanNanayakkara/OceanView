import React, {useState} from 'react';
import moment from "moment";
import {getAvailableRooms} from "../utils/ApiFunctions.js";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector.jsx";
import RoomSearchResults from "./RoomSearchResults.jsx";

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate : "",
        roomType : "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false);


    const handleSearch = (e) => {
        setHasSearched(true);
        e.preventDefault();

        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        console.log("Search Query" ,searchQuery)

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please, enter valid data range")
            return
        }

        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("check in date must be before check out date")
            return
        }

        setIsLoading(true)

        getAvailableRooms(
            searchQuery.checkInDate,
            searchQuery.checkOutDate,
            searchQuery.roomType
        )
            .then((response) => {
                console.log("API response: ", response);
                setAvailableRooms(response.data)
            })
            .catch((error) => {
                console.error(error)
            }).finally(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSearchQuery({...searchQuery, [name]: value})
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if (checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }
    }

    const ClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
        })
        setAvailableRooms([])
        setHasSearched(false)
    }

    console.log("Rendering RoomSearchResults with data:", availableRooms);

    return (
        <div>
            <Container className={"mt-5 mb-5 p-5 shadow-lg rounded-4 bg-white"}>
                <h4 className="text-center mb-4 fw-bold" style={{color: 'var(--primary-color, #0ea5e9)'}}>Find Your Perfect Room</h4>
                <Form onSubmit={handleSearch}>
                    <Row className={"justify-content-center align-items-end"}>

                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Form.Group controlId={'checkInDate'}>
                                <Form.Label className="fw-bold text-secondary small text-uppercase">
                                    Check-in date
                                </Form.Label>
                                <Form.Control
                                    type={"date"}
                                    name={"checkInDate"}
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3} className="mb-3 mb-md-0">
                            <Form.Group controlId={'checkOutDate'}>
                                <Form.Label className="fw-bold text-secondary small text-uppercase">
                                    Check-out date
                                </Form.Label>
                                <Form.Control
                                    type={"date"}
                                    name={"checkOutDate"}
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4} className="mb-3 mb-md-0">
                            <Form.Group controlId={'roomType'}>
                                <Form.Label className="fw-bold text-secondary small text-uppercase">
                                    Room Type
                                </Form.Label>
                                <div className={'d-flex gap-2'}>
                                    <div className="flex-grow-1">
                                        <RoomTypeSelector
                                            handleRoomInputChange={handleInputChange}
                                            newRoom={searchQuery}
                                        />
                                    </div>
                                    <Button className={"btn btn-hotel px-4"} type={"submit"}>
                                        Search
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>


                {hasSearched && (
                    isLoading ? (
                        <p className={"mt-4"}>finding available rooms...</p>
                    ) : Array.isArray(availableRooms) && availableRooms.length > 0 ? (
                        <RoomSearchResults
                            results={availableRooms}
                            onClearSearch={ClearSearch}
                        />
                    ) : (
                        <p className={"text-danger text-center mt-5"}>
                            No rooms available for the selected dates
                        </p>
                        )
                )}
                {hasSearched && errorMessage && (
                    <p className={"text-danger"}>{errorMessage}</p>
                )}
            </Container>
        </div>
    )
}

export default RoomSearch;
