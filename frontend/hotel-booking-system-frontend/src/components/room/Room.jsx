import React, {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions.js";
import RoomCard from "./RoomCard.jsx";
import {Col, Container, Row} from "react-bootstrap";
import RoomFilter from "../common/RoomFilter.jsx";
import RoomPaginator from "../common/RoomPaginator.jsx";

const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([{id: ""}])

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error)=>{
          setError(error)
          setIsLoading(false)
        })
    }, []);

    if (isLoading){
        return <div>Loading...</div>
    }
    if (error){
        return <div className={"text-danger"}>Error!! : {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage)

    const renderRooms = () => {
        const startIndex = (currentPage-1) * roomsPerPage
        const endIndex = startIndex + roomsPerPage
        return filteredData.slice(startIndex, endIndex).map((room) =>
            <RoomCard key={room.id} room={room}/>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6} className={"d-flex align-items-center justify-content-end"}>
                    <RoomFilter data={data} setFilteredData={setFilteredData}/>
                </Col>
            </Row>

            <Row>
                {renderRooms()}
            </Row>

            <Row>
                <Col md={6} className={"mb-3 mb-md-0"}>
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Room;
