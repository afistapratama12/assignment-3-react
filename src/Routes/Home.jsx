import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to="/student">
                <button data-testid="student-btn">All Student</button>
            </Link>
        </div>
    );
};

export default Home;