import React, { useState } from "react";

const Form = () => {
  const [student, setStudent] = useState([
    {name: "",
    lname: "",
    age: "",
    nameError: "",
    lnameError: "",
    ageError: "",
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newStudent = { ...student };

    if (name === "name") {
      newStudent.nameError = value === "" ? "Please enter a name" : "";
    }

    if (name === "age") {
      newStudent.ageError = value === "" ? "Please enter an age" : "";
    }

    if (name === "lname") {
      newStudent.lnameError = value === "" ? "Please enter a last name" : "";
    }

    newStudent[name] = value;
    setStudent(newStudent);
  };

  return (
    <>
    <h1>My Name is John Doe</h1>
    <form>
      <div>
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={handleChange}
        />
        {student.nameError && <p style={{ color: "red" }}>{student.nameError}</p>}
      </div>

      <div>
        <input
          type="text"
          name="age"
          value={student.age}
          placeholder="Age"
          onChange={handleChange}
        />
        {student.ageError && <p style={{ color: "red" }}>{student.ageError}</p>}
      </div>

      <div>
        <input
          type="text"
          name="lname"
          value={student.lname}
          placeholder="Last Name"
          onChange={handleChange}
        />
        {student.lnameError && <p style={{ color: "red" }}>{student.lnameError}</p>}
      </div>
    </form>
    </>
  );
};

export default Form;
