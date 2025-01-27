// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../assets/signup.png";
// import "../style/SignUpPageStyle.css";
// import toast from "react-hot-toast";

// function SignUpPage() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userName: "",
//     dob: "",
//     gender: "",
//   });

//   const [isEmailPasswordEntered, setIsEmailPasswordEntered] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [timer, setTimer] = useState(120); // Timer in seconds
//   const [isTimerActive, setIsTimerActive] = useState(false);
//   const Navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     console.log(formData.dob);
//     // If confirming the email (Confirm Email button clicked)
//     if (!isConfirming) {
//       try {
//         // Send request to initiate signup and send OTP to user's email
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/signup`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.email, 
//             username: formData.userName,
//             gender: formData.gender,
//             dateOfBirth: formData.dob,
//             password: formData.password,
//           }),
//         });

//         const data = await response.json();
//         console.log("My data : "+data);
//         if (data.isValidUser) {
//           toast.success("OTP sent to your email. Please check your inbox.", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeButton: false,
//             draggable: false,
//             pauseOnHover: false,
//             className: "large-toast",
//           });

//           setIsConfirming(true);  // Proceed to confirm step
//           setIsTimerActive(true);  // Start the timer for OTP input
//           setTimer(120);  // Reset timer to 2 minutes
//         } else {
//           console.log("In else :"+data.message);
//           toast.error(data.message || "Failed to send OTP. Please try again.", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeButton: false,
//             draggable: false,
//             pauseOnHover: false,
//             className: "large-toast",
//           });
//         }
//       } catch (error) {
//         console.error("Error during signup request:", error);
//         toast.error("An error occurred. Please try again later.", {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeButton: false,
//           draggable: false,
//           pauseOnHover: false,
//           className: "large-toast",
//         });
//       }
//     }

//     // If confirming OTP (Create Account button clicked)
//     else {
//       try {
//         // Send OTP confirmation request to validate OTP
//         console.log(formData.otp);
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/signup/confirmOtp`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.email, // Send the user's email
//             otp: formData.otp, // Send the OTP entered by the user
//           }),
//         });

//         const data = await response.json();
       
//           if (data.isValidUser) {
//             toast.success("Account created successfully! You can now log in.", {
//               position: "top-center",
//               autoClose: 2000,
//               hideProgressBar: true,
//               closeButton: false,
//               draggable: false,
//               pauseOnHover: false,
//               className: "large-toast",
//             });
//             Navigate("/login"); // Redirect to login page after successful signup
//           } else {
//             toast.error(data.message || "Account creation failed. Please try again.", {
//               position: "top-center",
//               autoClose: 2000,
//               hideProgressBar: true,
//               closeButton: false,
//               draggable: false,
//               pauseOnHover: false,
//               className: "large-toast",
//             });
//           }
//       } catch (error) {
//         console.error("Error during OTP confirmation:", error);
//         toast.error("An error occurred. Please try again later.", {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeButton: false,
//           draggable: false,
//           pauseOnHover: false,
//           className: "large-toast",
//         });
//       }
//     }
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (name === "email" || name === "password") {
//       // Check if both email and password are entered
//       if (formData.email && formData.password) {
//         setIsEmailPasswordEntered(true);
//       } else {
//         setIsEmailPasswordEntered(false);
//       }
//     }
//   };


//   // Handle timer countdown
//   useEffect(() => {
//     let timerInterval;
//     if (isTimerActive && timer > 0) {
//       timerInterval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setIsTimerActive(false); // Stop the timer when it reaches 0
//       setIsConfirming(false); // Revert to initial state
//     }
//     return () => clearInterval(timerInterval);
//   }, [isTimerActive, timer]);

//   // Format timer as mm:ss
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <main className="page-content" >
//       <div className="content-container">
//         <div className="signup-wrapper">
//           <div className="signup-image">
//             <img src={signupImage} alt="Peaceful meditation illustration" />
//           </div>

//           <form onSubmit={handleSubmit} className="signup-form">
//             <div className="form-header">
//               <h2>Create Account</h2>
//               <p>Start your stress management journey today</p>
//             </div>

//             <div className="form-columns">
//               <div className="form-group animate-in">
//                 <input
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleChange}
//                   placeholder="User Name"
//                   required
//                 />
//               </div>
//               <div className="form-group animate-in">
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className="gender-select"
//                 >
//                   <option value="" disabled>
//                     Select Gender
//                   </option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group animate-in">
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 placeholder="Date of birth"
//                 required
//               />
//             </div>

//             <div className="form-group animate-in">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 required
//               />
//             </div>

//             <div className="form-group animate-in">
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//               />
//             </div>

//             <div className="form-group animate-in">
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 required
//               />
//             </div>

//             {/* Conditional rendering of confirm email field */}
//             {isConfirming && (
//               <div>
//                 <div className="form-group animate-in">
//                   <input
//                     type="text"
//                     name="otp"
//                     value={formData.otp}
//                     onChange={handleChange}
//                     placeholder="Enter verification code"
//                     required
//                   />
//                 </div>
//                 {/* Display Timer */}
//                 <p className="timer-text">Time remaining: {formatTime(timer)}</p>
//               </div>
//             )}

//             <button type="submit" className="submit-btn animate-in">
//               {isConfirming ? "Create Account" : "Confirm Email"}
//             </button>

//             <p className="login-link animate-in">
//               Already have an account?{" "}
//               <Link to="/login" className="link">
//                 Login here
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default SignUpPage;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signup.png";
import "../style/SignUpPageStyle.css";
import toast from "react-hot-toast";
import axios from 'axios'; // Import axios

function SignUpPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    dob: "",
    gender: "",
  });

  const [isEmailPasswordEntered, setIsEmailPasswordEntered] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timer, setTimer] = useState(120); // Timer in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.dob);

    // If confirming the email (Confirm Email button clicked)
    if (!isConfirming) {
      try {
        // Send request to initiate signup and send OTP to user's email using axios
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/signup`, {
          email: formData.email, 
          username: formData.userName,
          gender: formData.gender,
          dateOfBirth: formData.dob,
          password: formData.password,
        });

        const data = response.data; // Axios response is in data property
        console.log("My data : " + data);
        if (data.isValidUser) {
          toast.success("OTP sent to your email. Please check your inbox.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            pauseOnHover: false,
            className: "large-toast",
          });

          setIsConfirming(true);  // Proceed to confirm step
          setIsTimerActive(true);  // Start the timer for OTP input
          setTimer(120);  // Reset timer to 2 minutes
        } else {
          console.log("In else :" + data.message);
          toast.error(data.message || "Failed to send OTP. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            pauseOnHover: false,
            className: "large-toast",
          });
        }
      } catch (error) {
        console.error("Error during signup request:", error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast",
        });
      }
    }

    // If confirming OTP (Create Account button clicked)
    else {
      try {
        // Send OTP confirmation request to validate OTP using axios
        console.log(formData.otp);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/signup/confirmOtp`, {
          email: formData.email, // Send the user's email
          otp: formData.otp, // Send the OTP entered by the user
        });

        const data = response.data;

        if (data.isValidUser) {
          toast.success("Account created successfully! You can now log in.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            pauseOnHover: false,
            className: "large-toast",
          });
          Navigate("/login"); // Redirect to login page after successful signup
        } else {
          toast.error(data.message || "Account creation failed. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            pauseOnHover: false,
            className: "large-toast",
          });
        }
      } catch (error) {
        console.error("Error during OTP confirmation:", error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          draggable: false,
          pauseOnHover: false,
          className: "large-toast",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "email" || name === "password") {
      // Check if both email and password are entered
      if (formData.email && formData.password) {
        setIsEmailPasswordEntered(true);
      } else {
        setIsEmailPasswordEntered(false);
      }
    }
  };

  // Handle timer countdown
  useEffect(() => {
    let timerInterval;
    if (isTimerActive && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it reaches 0
      setIsConfirming(false); // Revert to initial state
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive, timer]);

  // Format timer as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <main className="page-content">
      <div className="content-container">
        <div className="signup-wrapper">
          <div className="signup-image">
            <img src={signupImage} alt="Peaceful meditation illustration" />
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Start your stress management journey today</p>
            </div>

            <div className="form-columns">
              <div className="form-group animate-in">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="form-group animate-in">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="gender-select"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group animate-in">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of birth"
                required
              />
            </div>

            <div className="form-group animate-in">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-group animate-in">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group animate-in">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            {/* Conditional rendering of confirm email field */}
            {isConfirming && (
              <div>
                <div className="form-group animate-in">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter verification code"
                    required
                  />
                </div>
                {/* Display Timer */}
                <p className="timer-text">Time remaining: {formatTime(timer)}</p>
              </div>
            )}

            <button type="submit" className="submit-btn animate-in">
              {isConfirming ? "Create Account" : "Confirm Email"}
            </button>

            <p className="login-link animate-in">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
