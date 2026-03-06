import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2 className="hotel-color mb-4">Welcome to Admin Panel</h2>
                <hr/>
                <div className="d-flex flex-column">
                    <Link to="/existing-rooms" className="btn btn-hotel mb-3" style={{ width: "200px"}}>
                        Manage Rooms
                    </Link>
                    <Link to="/existing-bookings" className="btn btn-hotel" style={{ width: "200px"}}>
                        Manage Bookings
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Admin;
