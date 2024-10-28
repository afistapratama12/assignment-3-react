import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
    const [student, setStudent] = useState(null);
    const [fullname, setFullname] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [programStudy, setProgramStudy] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/student/${id}`);
                const data = await response.json();
                setStudent(data);
                setFullname(data.fullname);
                setProfilePicture(data.profilePicture);
                setAddress(data.address);
                setPhoneNumber(data.phoneNumber);
                setBirthDate(data.birthDate);
                setGender(data.gender);
                setProgramStudy(data.programStudy);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const faculty = getFacultyByProgramStudy(programStudy);
        const updatedStudent = {
            fullname,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudent),
            });
            navigate("/student");
        } catch (error) {
            console.log(error);
        }
    };

    const getFacultyByProgramStudy = (programStudy) => {
        switch (programStudy) {
            case "Ekonomi":
            case "Manajemen":
            case "Akuntansi":
                return "Fakultas Ekonomi";
            case "Administrasi Publik":
            case "Administrasi Bisnis":
            case "Hubungan Internasional":
                return "Fakultas Ilmu Sosial dan Politik";
            case "Teknik Sipil":
            case "Arsitektur":
                return "Fakultas Teknik";
            case "Matematika":
            case "Fisika":
            case "Informatika":
                return "Fakultas Teknologi Informasi dan Sains";
            default:
                return "";
        }
    };

    return (
        <div>
            {student ? (
                <div>
                    <img src={profilePicture} alt={fullname} />
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="fullname">Full Name:</label>
                            <input
                                type="text"
                                id="fullname"
                                value={fullname}
                                onChange={(event) => setFullname(event.target.value)}
                                data-testid="name"
                            />
                        </div>

                        <div>
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                data-testid="address"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                data-testid="phoneNumber"
                            />
                        </div>
                        <div>
                            <label htmlFor="birthDate">Birth Date:</label>
                            <input
                                type="text"
                                id="birthDate"
                                value={birthDate}
                                onChange={(event) => setBirthDate(event.target.value)}
                                data-testid="date"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender">Gender:</label>
                            <input
                                type="text"
                                id="gender"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                data-testid="gender"
                            />
                        </div>
                        <div>
                            <label htmlFor="programStudy">Program Study:</label>
                            <input
                                type="text"
                                id="programStudy"
                                value={programStudy}
                                onChange={(event) => setProgramStudy(event.target.value)}
                                data-testid="prody"
                            />
                        </div>
                        <button type="submit" data-testid="edit-btn">
                            Update Student
                        </button>
                    </form>
                </div>

            ) : (
                <p>Loading ...</p>
            )}
        </div>
    );
};

export default EditStudent;