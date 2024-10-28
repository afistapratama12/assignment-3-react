import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterStudents();
    }, [filter, students]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/student");
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterStudents = () => {
        if (filter === "All") {
            setFilteredStudents(students);
        } else {
            const filteredData = students.filter(
                (student) => student.faculty === filter
            );
            setFilteredStudents(filteredData);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
            });
            const updatedStudents = students.filter(
                (student) => student.id !== id
            );
            setStudents(updatedStudents);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const navigateToEdit = (id) => {
        navigate(`/student/${id}`);
    };

    return (
        <div>
            <select value={filter} onChange={handleFilterChange} data-testid="filter">
                <option value="All">All</option>
                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                <option value="Fakultas Ilmu Sosial dan Politik">
                    Fakultas Ilmu Sosial dan Politik
                </option>
                <option value="Fakultas Teknik">Fakultas Teknik</option>
                <option value="Fakultas Teknologi Informasi dan Sains">
                    Fakultas Teknologi Informasi dan Sains
                </option>
            </select>
            {students.length === 0 ? (
                <p>Loading ...</p>
            ) : (
                <table id="table-student">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Program Study</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={student.id} className="student-data-row">
                                <td>{index + 1}</td>
                                <td onClick={() => navigateToEdit(student.id)}>
                                    {student.fullname}
                                </td>
                                <td>{student.faculty}</td>
                                <td>{student.programStudy}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        data-testid={`delete-${student.id}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Student;