# Hotel Booking System

## Description

The **Hotel Booking System** is a web application designed for hotel management and booking. This system allows users to search for hotels, view available rooms, and make reservations online. Hotel owners and administrators can manage room availability, pricing, and bookings through an intuitive admin interface.

## Features
- **User Interface**: Users can browse available hotels and book rooms based on criteria like location, price, and availability.
- **Room Management**: Admins can add, update, or remove rooms, set pricing, and adjust availability.
- **Booking System**: Users can make bookings, view their booking history, and cancel bookings if needed.
- **User Authentication**: Users and admins have secure login/logout functionalities, with role-based access control.
- **Admin Dashboard**: Admins have access to a dashboard for managing users, rooms, and bookings.

## Technologies Used
- **Spring Boot**: Framework for building the backend application.
- **Java**: Primary language for backend development.
- **Spring Security**: For user authentication and authorization.
- **MySQL**: Database for storing hotel, room, and booking data.
- **Bootstrap**: For responsive frontend design.

## Setup Instructions

### Prerequisites
Ensure you have the following tools installed:
- **JDK 11 or later** (Java Development Kit)
- **Maven** (for building the project)
- **MySQL** (for database management)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/KavinduSenesh/Hotel-Booking-System.git
   cd Hotel-Booking-System
Set up your MySQL database:

Create a new database in MySQL (e.g., hotel_booking_system).

Update the application.properties file with your MySQL credentials:

### properties

spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking_system
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
Build the project using Maven:

```
mvn clean install
Run the Spring Boot application:

```
mvn spring-boot:run
The application will be available at http://localhost:8080.

### Available Endpoints
/login: User login page.

/admin: Admin dashboard (accessible only by admins).

/hotel/search: Search for available hotels.

/booking/new: Create a new booking.

/booking/history: View booking history.

Project Structure
Here’s a breakdown of the project structure:

```
/src
    /main
        /java
            /com
                /hotel
                    /controller      # Controllers for user and admin functionality
                    /model           # Model classes representing entities like User, Hotel, Room, Booking
                    /repository      # JPA repositories for database operations
                    /service         # Business logic and service layers
                    /security        # Security configuration (authentication and authorization)
        /resources
            application.properties   # Configuration settings for database and application
            /templates                # Thymeleaf templates for HTML views
            /static                   # Static assets like images, CSS, JavaScript

```
### Issues

If you encounter any bugs or have suggestions for improvements, please open an issue on the GitHub issues tab.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
Spring Boot for simplifying the development of backend applications.

MySQL for database management.

Bootstrap for making the frontend responsive.

Thymeleaf for rendering dynamic HTML pages.






