import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div class="container">
      <div class="login-box">
        <h2>Member Portal</h2>

        <label for="username">Username</label>
        <input type="text" id="username" />
        <label for="password">Password</label>
        <input type="password" id="password" />
        <button>Login</button>
      </div>
      <div class="benefits">
        <h2>Member Benefits</h2>
        <ul>
          <li>Access to exclusive resources</li>
          <li>Project collaboration tools</li>
          <li>Discussion forums</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginForm;
