import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import Child from "./Child";
import Parent from "./Parent";
const App = () => {
  const [btn, setBtn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [otp, setOtp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState("");
  const [arrays, setArray] = useState([]);
  const itemsPerPage = 10;

  const handleJoinClick = () => {
    setBtn(true);
    window.open("https://t.me/Telegram", "_blank");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        let data = await response.json();
        setData(data);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4006/api/v1/register",
        form
      );
      if (response.data.status) {
        setIsRegistered(true);
        setMessage("OTP sent to your email");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4006/api/v1/verifyOtp",
        { email: form.email, otp }
      );
      if (response.data.status) {
        setOtp("");
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage("OTP verification failed");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4006/api/v1/resendOtp",
        { email: form.email }
      );
      setMessage(response.data.message);
      setOtp(response.data.newOtp);
    } catch (error) {
      setMessage("Failed to resend OTP");
    }
  };
  // Calculate the indexes for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  let y = [1, 2, 3, 3, 4, 5, 6, 7];
  // console.log(y.slice(2,3))
  let a = ["shyam", "madam"];
  let obj = {};
  useEffect(() => {
    for (let i = 0; i < a.length; i++) {
      let x = a[i];
      // console.log(x?.split(""))
      // console.log(a.join(""))
      // console.log(a[i])
    }
  }, []);
  const handleAdd = () => {
    setArray([...arrays, input]); // Purane array ke elements ke saath naya input add kiya
  };
  //  console.log(arrays, "dd")
  // console.log(obj)
  return (
    <div>
      <Form />
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <button>Delete</button>
      <h1>Register</h1>
      {message && <p>{message}</p>}
      {!isRegistered ? (
        <>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <button type="submit">Verify OTP</button>
          <button onClick={handleResendOtp}>Resend OTP</button>
        </form>
      )}
      <div className="App">
        <button onClick={handleJoinClick}>Join</button>

        <button
          style={{
            opacity: !btn ? "1" : "1",
            pointerEvents: !btn ? "none" : "auto",
          }}
          disabled={!btn}
        >
          Claim
        </button>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage * itemsPerPage >= data.length}
        >
          Next
        </button>
      </div>

      <Child />
      <Parent />
    </div>
  );
};

export default App;
