import React, { useState } from "react";
import "./Form.css";
import Popup from "../Form/Popup/Popup";
import StudentData from "./StudentData";
const Form = () => {
  const [students, setStudents] = useState([
    {
      name: "",
      lname: "",
      age: "",
      nameError: "",
      lnameError: "",
      ageError: "",
    },
  ]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popupSuccessMessage, setPopupSuccessMessage] = useState("");
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStudents = [...students];
    let regex = /^(100|[1-9]?[0-9])$/;
    if (name === "name") {
      updatedStudents[index].nameError =
        value === "" ? "Please enter name" : "";
    }
    if (name === "lname") {
      updatedStudents[index].lnameError =
        value === "" ? "Please enter last name" : "";
    }
    if (name === "age") {
      updatedStudents[index].ageError =
        value === ""
          ? "Please enter age"
          : !regex.test(value)
          ? "Please enter a valid age (0-100)"
          : "";
    }
    updatedStudents[index][name] = value;
    setStudents(updatedStudents);
  };
  const addStudentForm = () => {
    const hasError = students.some((student) => {
      return (
        student.nameError !== "" ||
        student.lnameError !== "" ||
        student.ageError !== "" ||
        student.name === "" ||
        student.lname === "" ||
        student.age === ""
      );
    });
    if (hasError) {
      setErrorMessage("Please fill the required fields.");
      setPopupVisible(true);
      return;
    }
    setStudents([
      {
        name: "",
        age: "",
        lname: "",
        lnameError: "",
        ageError: "",
        nameError: "",
      },
    ]);
    setTimeout(() => {
      setErrorMessage("");
      setPopupSuccessMessage("Thanks for registration.");
      setPopupVisible(true);
    }, 2000);
  };
  return (
    <>
      <form className="form-container">
        <h2>Student Registration</h2>
        {students.map((student, index) => (
          <div key={index}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={student.name}
                placeholder="First Name"
                onChange={(e) => handleChange(e, index)}
                className={`form-input ${
                  student.nameError ? "input-error" : ""
                }`}
              />
              {student.nameError && (
                <p className="error-text">{student.nameError}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lname"
                value={student.lname}
                placeholder="Last Name"
                onChange={(e) => handleChange(e, index)}
                className={`form-input ${
                  student.lnameError ? "input-error" : ""
                }`}
              />
              {student.lnameError && (
                <p className="error-text">{student.lnameError}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="age"
                value={student.age}
                placeholder="Age"
                onChange={(e) => handleChange(e, index)}
                className={`form-input ${
                  student.ageError ? "input-error" : ""
                }`}
              />
              {student.ageError && (
                <p className="error-text">{student.ageError}</p>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={addStudentForm} className="submit-btn">
         Submit
        </button>
      </form>
      {popupVisible && (
        <Popup
          message={errorMessage || popupSuccessMessage}
          type={errorMessage ? "Error" : "Success"}
          closePopup={() => setPopupVisible(false)}
        />
      )}
      <StudentData student={students} />
    </>
  );
};

export default Form;
