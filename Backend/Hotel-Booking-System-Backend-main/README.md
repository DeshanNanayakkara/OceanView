# Hotel Booking System (Backend)

## 📌 Overview
This is the **Spring Boot backend** implementation of the Hotel Booking System. It exposes a robust RESTful API for:
- User Registration & Context-sensitive Authentication (JWT)
- Role-Based Access Control (`ROLE_USER` & `ROLE_ADMIN`)
- Comprehensive Room Management (Create, Read, Update, Delete with Images)
- Booking Management (Checking availability, making reservations, and cancellation)

The frontend counterpart is built with React.

---

## 🏗️ How This Code Works (Architecture)

This application adheres to the classic layered architectural pattern common in Spring Boot applications, ensuring a clean separation of concerns:

### 1. Controllers (`lk.ijse.gdse68.hotelbookingsystem.controller`)
Controllers are the entry points for external HTTP requests. They parse REST endpoints, deserialize JSON payloads into DTOs or Entities, and map URLs to specific operations. They do not contain complex business logic. 
- **`AuthController`**: Handles login/registration and issues JWT tokens.
- **`UserController`**: Retrieves or deletes users based on privileges.
- **`RoomController`**: Manages room data including uploading room photos (base64 encoded blob persistence) and checking room availability based on dates.
- **`BookedRoomController`**: Handles processing reservations against rooms.
- **`RoleController`**: Enables dynamic creation of User roles and assignments.

### 2. Services (`lk.ijse.gdse68.hotelbookingsystem.service`)
This layer holds the core business logic.
- Before a room is booked (in `BookedRoomService`), it validates that the room is actually available for the desired `checkInDate` and `checkOutDate`.
- `UserService` manages the intricacies of securely hashing user passwords and verifying existing user records.

### 3. Repositories (`lk.ijse.gdse68.hotelbookingsystem.repository`)
Interfaces extending `JpaRepository` representing the Data Access Layer. They interact seamlessly with the underlying SQL database via Hibernate to execute CRUD operations without writing raw queries.

### 4. Entities/Models (`lk.ijse.gdse68.hotelbookingsystem.model`)
JPA-mapped objects corresponding to Database tables.
- **`User`**: Models a platform user. Has a many-to-many relationship with `Roles`.
- **`Room`**: Holds room specifications (type, price, image `Blob`). Has a one-to-many relationship with `BookedRoom`.
- **`BookedRoom`**: Represents a specific reservation timeframe. Ties a Guest (`User`) to a `Room`.
- **`Roles`**: Represents the system roles (e.g., ADMIN, USER).

### 5. Security Flow (`lk.ijse.gdse68.hotelbookingsystem.security`)
- **Authentication**: When a user logs in via `/auth/login`, `Spring Security` coordinates with `AuthenticationManager` to verify credentials. Upon success, `JwtUtils` generates a cryptographically signed JSON Web Token (JWT).
- **Authorization**: Subsequent requests must include `Authorization: Bearer <token>`. A custom filter intercepts these requests, validates the signature/expiration, extracts the username + roles (`HotelUserDetails`), and populates the `SecurityContextHolder`.
- **Method-Level Security**: Controllers use annotations like `@PreAuthorize("hasRole('ROLE_ADMIN')")` ensuring endpoints are protected at the invocation level.

---

## 🧩 Comprehensive API Documentation

### Base URL: `http://localhost:9192/api/v1`

| Headers required for secured endpoints |
| :--- |
| `Authorization`: `Bearer <JWT_TOKEN>` |

### 1️⃣ Authentication (`/auth`)

#### Register a New User
- **Method**: `POST` `/auth/register`
- **Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "securepassword"
  }
  ```
- **Responses**:
  - `200 OK`: `Registration successful`
  - `409 Conflict`: If the email is already registered.

#### Login
- **Method**: `POST` `/auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "securepassword"
  }
  ```
- **Responses**:
  - `200 OK`: Returns the user details and JWT token:
    ```json
    {
      "id": 1,
      "email": "jane@example.com",
      "token": "eyJhbGciOiJIUzUxMiJ9...",
      "roles": ["ROLE_USER"]
    }
    ```

### 2️⃣ Users (`/user`)

#### Get All Users (Admin)
- **Method**: `GET` `/user/all`
- **Security**: `ROLE_ADMIN`
- **Responses**: `302 FOUND` containing a list of all User objects.

#### Get User by Email
- **Method**: `GET` `/user/get/{email}`
- **Security**: `ROLE_USER` or `ROLE_ADMIN`
- **Responses**: `200 OK` (User Object), `404 NOT FOUND` (if user doesn't exist).

#### Delete User
- **Method**: `DELETE` `/user/delete/{email}`
- **Security**: `ROLE_ADMIN` OR the authenticated user must match the `{email}`.
- **Responses**: `200 OK`

### 3️⃣ Rooms (`/rooms`)

#### Add a New Room (Admin)
- **Method**: `POST` `/rooms/add/new-room`
- **Security**: `ROLE_ADMIN`
- **Content-Type**: `multipart/form-data`
- **Parameters**: `photo` (File), `roomType` (String), `roomPrice` (Decimal)
- **Responses**: `200 OK` (RoomResponse)

#### Get All Room Types
- **Method**: `GET` `/rooms/get/room-types`
- **Responses**: `200 OK` (Array of Strings)

#### Get All Rooms
- **Method**: `GET` `/rooms/get/all-rooms`
- **Responses**: `200 OK` (Array of RoomResponse containing base64 encoded photo images).

#### Get Room by ID
- **Method**: `GET` `/rooms/get/room/{id}`
- **Responses**: `200 OK` (RoomResponse), `404 NOT FOUND`

#### Get Available Rooms (Search)
- **Method**: `GET` `/rooms/get/available-rooms`
- **Query Params**:
  - `checkInDate`: `YYYY-MM-DD`
  - `checkOutDate`: `YYYY-MM-DD`
  - `roomType`: String (e.g., "Single", "Double")
- **Responses**: `200 OK` (Array of RoomResponse), `204 NO CONTENT` (if none available).

#### Update Room (Admin)
- **Method**: `PUT` `/rooms/update/room/{id}`
- **Security**: `ROLE_ADMIN`
- **Content-Type**: `multipart/form-data`
- **Params**: `roomType` (optional), `roomPrice` (optional), `photo` (optional)
- **Responses**: `200 OK` (RoomResponse)

#### Delete Room (Admin)
- **Method**: `DELETE` `/rooms/delete/room/{id}`
- **Security**: `ROLE_ADMIN`
- **Responses**: `204 NO CONTENT`

### 4️⃣ Bookings (`/bookings`)

#### Create a Booking
- **Method**: `POST` `/bookings/save/booking/{roomId}`
- **Body**:
  ```json
  {
    "guestFullName": "Jane Doe",
    "guestEmail": "jane@example.com",
    "numOfAdults": 2,
    "numOfChildren": 0,
    "checkInDate": "2026-05-15",
    "checkOutDate": "2026-05-20"
  }
  ```
- **Responses**:
  - `200 OK`: System generates and returns a unique alphanumeric confirmation code.
  - `400 BAD REQUEST`: Invalid request/dates constraint check failed.

#### Get Booking by Confirmation Code
- **Method**: `GET` `/bookings/get/confirmation/{confirmationCode}`
- **Responses**: `200 OK` (BookingResponse), `404 NOT FOUND`

#### Get Bookings By User Email
- **Method**: `GET` `/bookings/get/{userEmail}`
- **Responses**: `200 OK` (Array of BookingResponse)

#### Get All Bookings (Admin)
- **Method**: `GET` `/bookings/get/all-bookings`
- **Security**: `ROLE_ADMIN`
- **Responses**: `200 OK` (Array of BookingResponse)

#### Cancel Booking
- **Method**: `DELETE` `/bookings/delete/booking/{bookingId}`
- **Responses**: `200 OK`

### 5️⃣ Roles (`/role`)

#### Get All Roles
- **Method**: `GET` `/role/all`
- **Responses**: `302 FOUND` (Array of Role Objects)

#### Create New Role
- **Method**: `POST` `/role/create-new-role`
- **Body**:
  ```json
  {
    "name": "ROLE_MANAGER"
  }
  ```
- **Responses**: `200 OK`, `409 CONFLICT`

#### Delete Role
- **Method**: `DELETE` `/role/delete/{roleId}`
- **Responses**: `200 OK`

#### Manage User Roles
- **Remove All Users From Role**: `POST` `/role/remove-all-users-from-role/{roleId}`
- **Remove User From Role**: `POST` `/role/remove-user-from-role?userId={id}&roleId={id}`
- **Assign Role To User**: `POST` `/role/assign-roles-to-user?userId={id}&roleId={id}`

---

## 🚀 Deployment & Local Execution

### Prerequisites
- Java 17+
- Maven
- MySQL

### Database Setup
Ensure you have a MySQL instance running:
```sql
CREATE DATABASE IF NOT EXISTS hotelbooking;
```
Configure credentials in `src/main/resources/application.yml`. Note that the system automatically runs `data.sql` to seed required standard roles (`ROLE_USER` and `ROLE_ADMIN`) on startup.

### Running the App
```bash
mvn clean package
mvn spring-boot:run
```
Server runs locally with port: `9192`.
