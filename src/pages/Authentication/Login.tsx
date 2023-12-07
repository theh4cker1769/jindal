import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Login = () => {

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className='login-div'>
      <form>
        <div className="form-box user-img">
          <img src="/images/download.png" alt="User" />
        </div>
        <div className="form-box">
          <div className="input-div">
            <label htmlFor="userName">User Name</label>
            <div className="input-div-icon">
              <FaUser />
              <input type="text" id="userName" />
              <fieldset aria-hidden="true">
                <legend className="css-1in441m">
                  <span>User Name</span>
                </legend>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="form-box">
          <div className="input-div">
            <label htmlFor="userName">Password</label>
            <div className="input-div-icon">
              <IoMdLock />
              <input type="password" id="userName" />
              <fieldset aria-hidden="true">
                <legend className="css-1in441m">
                  <span>Password</span>
                </legend>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="form-box input-options">
          <div className="remember-me-container">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="remember-me-checkbox"
              />
              {rememberMe ? <MdOutlineCheckBoxOutlineBlank /> : <IoMdCheckbox />}
              Remember Me
            </label>
          </div>
          <a href="#">Forgot Password ?</a>
        </div>
        <div className="form-box">
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login