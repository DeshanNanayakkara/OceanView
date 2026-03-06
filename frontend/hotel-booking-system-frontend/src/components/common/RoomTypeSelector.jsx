 import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
         if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
         }
    }

    return(
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        id="roomType"
                        name="roomType"
                        className="form-select custom-select"
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if(e.target.value === "Add New"){
                                setShowNewRoomTypeInput(true)
                            }else{
                                handleRoomInputChange(e)
                            }
                        }}  
                    >
                        <option value={""}> select a room type</option>
                        <option value={"Add New"}> Add new </option>
                        {
                            roomTypes.map((type, index) => (
                                <option key={index} value={type}> 
                                    {type} 
                                </option>
                            ))
                        }
                    </select>
                    {
                        showNewRoomTypeInput && (
                            <div className="input-group mt-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter a new room type"
                                    onChange={handleNewRoomInputChange}
                                    style={{padding: "10px"}}
                                />
                                <button 
                                    className="btn btn-hotel custom-button" 
                                    type="button"
                                    onClick={handleAddNewRoomType}
                                >
                                    Add
                                </button>
                            </div>
                        )
                    }
                </div>
            )}
            <style>
                {
                `
                .custom-button{
                    background-color:rgb(128, 36, 36);
                    color: white;
                    border: none;
                }
                `
                }
            </style>
        </>
    )
}

export default RoomTypeSelector;