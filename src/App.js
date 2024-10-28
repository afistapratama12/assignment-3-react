import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";
import Student from "./Routes/Student";
import NavBar from "./components/Navbar";

const App = () => {
    return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/student" element={<Student />} />
            <Route path="/student/:id" element={<EditStudent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
    );
};

export default App;
