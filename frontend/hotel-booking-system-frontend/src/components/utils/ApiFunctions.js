import axios from 'axios';

export const api = axios.create({
    baseURL :"http://localhost:9192/api/v1"
})

// get header
export const getHeader = () => {
    const token = localStorage.getItem("token");
    return{
        Authorization : `Bearer ${token}`
    }
}

// adds a new room to the database
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader()
    })
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// gets all room types from the database
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/get/room-types")
        return response.data
    }catch(error){
        throw new Error(`Error while fetching room types ${error}`)
    }
}

// gets all rooms from the database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/get/all-rooms")
        return result.data
    }catch(error){
        throw new Error(`Error while fetching rooms ${error}`)
    }
}

// deletes a room from the database
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        })
        return result.data
    }catch(error){
        throw new Error(`Error while deleting the room ${error}`)
    }
}

// updates a room in the database
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/room/${roomId}`, formData, {
        headers: getHeader()
    })
    return response
}

// gets a room by id from the database
export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/get/room/${roomId}`)
        return result.data
    }catch (error){
        throw new Error(`Error while fetching room ${error}`)
    }
}

// books a room
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/save/booking/${roomId}`, booking, {
            headers: getHeader()
        });
        return response.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error while fetching booking : ${error.message}`)
        }
    }
}

// gets all bookings from the database
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/get/all-bookings", {
            headers: getHeader()
        });
        console.log("Bookings : ", result.data)
        return result.data
    }catch (error){
        throw new Error(`Error while fetching bookings ${error}`)
    }
}

// get bookings by confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/bookings/get/confirmation/${confirmationCode}`)
        return result.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error while fetching booking : ${error.message}`)
        }
    }
}

// deletes a booking from the database
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/delete/booking/${bookingId}`)
        return result.data
    }catch (error){
        throw new Error(`Error while deleting booking ${error.message}`)
    }
}

// gets all available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    try{
        const result = await api.get(`/rooms/get/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result
    }catch (error){
        throw new Error(`Error while fetching rooms ${error}`)
    }
}

// register a new user
export async function registerUser(registrationData){
    try {
        const response = await api.post("/auth/register", registrationData)
        return response.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error while fetching booking : ${error.message}`)
        }
    }
}

// login a user
export async function loginUser(loginData){
    try {
        const response = await api.post("/auth/login", loginData)
        if (response.status >= 200 && response.status < 300){
            return response.data
        }else{
            return null
        }
    }catch (error){
        console.error(`Error while fetching login user ${error}`)
        return null
    }
}

// get user profile
export async function getUserProfile(userId, token){
    try {
        const response = await api.get(`/user/get/${userId}`,{
           headers: getHeader()
        })
        return response.data
    }catch (error){
        throw new Error(`Error while fetching user profile ${error}`)
    }
}

// delete a user
export async function deleteUser(userId){
    try{
        const response = await api.delete(`/user/delete/${userId}`,{
            headers: getHeader()
        })
        return response.data
    }catch (error){
        return error.message
    }
}

// get user by id
export async function getUser(userId, token){
    try {
        const response = await api.get(`/user/get/${userId}`,{
            headers: getHeader()
        })
        return response.data
    }catch (error){
        throw new Error(`Error while fetching user ${error}`)
    }
}

// get bookings by user id
export async function getBookingsByUserId(userId, token){
    try{
        const response = await api.get(`/bookings/get/${userId}`,{
            headers: getHeader()
        })
        return response.data
    }catch (error){
        console.error(`Error while fetching user ${error}`)
        throw new Error(`Failed to fetch bookings`)
    }
}




