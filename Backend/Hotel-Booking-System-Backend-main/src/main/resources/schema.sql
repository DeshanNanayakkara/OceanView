-- DDL for Hotel Booking System entities

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE room (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(255),
    room_price DECIMAL(19,2),
    is_booked BOOLEAN,
    photo BLOB
);

CREATE TABLE booked_room (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    check_in DATE,
    check_out DATE,
    guest_full_name VARCHAR(255),
    guest_email VARCHAR(255),
    adults INT,
    children INT,
    total_guests INT,
    confirmation_code VARCHAR(255),
    room_id BIGINT,
    FOREIGN KEY (room_id) REFERENCES room(id)
);
