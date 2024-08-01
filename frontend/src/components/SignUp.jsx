import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { signup } from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const countryCode = "+91"; // Define countryCode

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new request
    setSuccess(null); // Reset success state before new request

    // Validate PIN length
    if (pin.length !== 4 || confirmPin.length !== 4) {
      setError("PIN must be exactly 4 digits long.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN and Confirm PIN do not match.");
      return;
    }

    try {
      const userData = await signup(
        firstName,
        lastName,
        email,
        countryCode + mobile,
        pin
      );
      setSuccess("Admin registered successfully!"); // Set success message
      console.log("Admin registered:", userData);
      navigate("/login");
    } catch (error) {
      setError(error.message); // Set error message from API response
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-20">
      <div className="w-full max-w-screen-sm flex rounded-lg shadow-md overflow-hidden">
        <div className="w-2/3 bg-yellow-500 flex flex-col items-center justify-center py-10 px-6">
          <form onSubmit={handleSubmit} className="w-full py-8">
            <h1 className="text-blue-700 font-black text-xl mb-6 text-center">
              Register as Admin
            </h1>
            <div className="mb-5 flex gap-3">
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded-full w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded-full w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded-full w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="tel"
                id="mobile"
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="Mobile Number"
                required
              />
            </div>
            <div className="mb-3 gap-3 flex">
              <input
                type="password"
                id="pin"
                className="shadow appearance-none border rounded-full w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength="4"
                placeholder="4-Digit PIN"
                required
              />
              <input
                type="password"
                id="confirm-pin"
                className="shadow appearance-none border rounded-full w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                maxLength="4"
                placeholder="Confirm PIN"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline w-1/2 mt-5"
              >
                Sign Up
              </button>
              {error && <p className="text-red-500 mt-3">{error}</p>}
              {success && <p className="text-blue-700 mt-3">{success}</p>}
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-orange-50 mt-2 cursor-text"
              >
                Already have an account?
                <span className="cursor-pointer text-orange-50 font-black">
                  {" "}
                  Sign In
                </span>
              </Link>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex items-center justify-center bg-orange-600">
          <img src={logo} alt="Logo" className="w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
