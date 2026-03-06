import React, {useEffect, useState} from "react";
import {getRoomById, updateRoom} from "../utils/ApiFunctions.js";
import {Link, useParams} from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector.jsx";

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const {roomId} = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({...room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setRoom({...room, [name]: value})
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const response = await updateRoom(roomId, room)
            if (response.status === 200){
                setSuccessMessage("Room updated successfully !")
                const updateRoomData = await getRoomById(roomId)
                setRoom(updateRoomData)
                setImagePreview(updateRoomData.photo)
                setErrorMessage("")
            }else{
                setErrorMessage("Error updating room")
            }
        }catch (error) {
            console.log(error)
            setErrorMessage("Error updating room")
        }
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-g">
                        <h2 className="mt-5 mb-2">Update Room</h2>
                        {
                            successMessage && (<div className="alert alert-success fade show"> {successMessage} </div>)
                        }
                        {
                            errorMessage && (<div className="alert alert-alert fade show"> {errorMessage} </div>)
                        }
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">
                                    Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={room}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    type="number"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={room.roomPrice}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Room Price
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={`data:image/jpeg;base64,${imagePreview}`}
                                        alt="Preview Image"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className="d-grid gap-2-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button type={"submit"} className={"btn btn-outline-warning"}>
                                    Edit Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditRoom
