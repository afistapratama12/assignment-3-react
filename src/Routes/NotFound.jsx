import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>404 - Page Not Found</h1>
            <button data-testid="back" onClick={() => navigate(-1)}>take me Back</button>
        </>
    );
};

export default NotFound;