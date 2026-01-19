import React from "react";
import p1 from "../../assets/p1.png";

export default function LoginPage() {
  return (
    <>
    <section className="hide">
      {/* Login Section */}
      <div className="auth-container">
        <div className="auth-left">
          <div className="circle">
            <img src={p1} alt="login visual" className="img1" />
          </div>
        </div>

        <div className="auth-right">
          <p className="welcome">Welcome Back!</p>

          <form className="form">
            <label>Email address</label>
            <input type="email" />

            <label>Password</label>
            <input type="password" />

            <p className="forgot">Forgot Password ?</p>

            <button type="submit">Sign in</button>

            <p className="signup">
              Don’t have an account? <span>Sign up</span>
            </p>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
