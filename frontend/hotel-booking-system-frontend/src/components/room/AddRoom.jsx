import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import {Link} from "react-router-dom";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : "",
        amenities: []
    })
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value)
            }else{
                value = ""
            }
        }
        setNewRoom({...newRoom, [name]: value})
    }

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        const currentAmenities = [...newRoom.amenities];
        
        if (checked) {
            currentAmenities.push(value);
        } else {
            const index = currentAmenities.indexOf(value);
            if (index > -1) {
                currentAmenities.splice(index, 1);
            }
        }
        setNewRoom({ ...newRoom, amenities: currentAmenities });
    }

    const availableAmenities = [
        "WiFi", "Netflix Premium", "Breakfast", "Mini bar refreshment", 
        "Car Service", "Parking Space", "Laundry Service", "AC", "Balcony"
    ];

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice, newRoom.amenities)
            if(success !== undefined){
                setSuccessMessage("Room added successfully !")

                setNewRoom({
                    photo : null,
                    roomType : "",
                    roomPrice : "",
                    amenities: []
                })
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error while adding room")
            }
        }catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-g">
                        <h2 className="mt-5 mb-2">Add a New Room</h2>
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
                                        handleRoomInputChange={handleRoomInputChange}
                                        newRoom={newRoom}
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
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label d-block">Room Amenities</label>
                                <div className="d-flex flex-wrap gap-3 p-3 border rounded shadow-sm bg-light">
                                    {availableAmenities.map((amenity, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={amenity}
                                                id={`amenity-${index}`}
                                                onChange={handleAmenityChange}
                                                checked={newRoom.amenities.includes(amenity)}
                                            />
                                            <label className="form-check-label" htmlFor={`amenity-${index}`}>
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
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
                                        src={imagePreview}
                                        alt="Preview Image"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className="d-grid d-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom;
