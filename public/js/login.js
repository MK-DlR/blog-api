// public/js/login.js

import { API_URL } from "../config.js";

export function loginForm() {
  const app = document.getElementById("app");
  // clear app
  app.innerHTML = "";

  // create login container
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  // create login title container and title
  const loginHeaderContainer = document.createElement("div");
  loginHeaderContainer.classList.add("login-header-container");
  const loginHeader = document.createElement("h2");
  loginHeader.classList.add("login-header");
  loginHeader.textContent = "Login";

  // create login form
  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  // create userEmail input and label
  const userEmail = document.createElement("input");
  userEmail.classList.add("login-input");
  userEmail.name = "email";
  userEmail.id = "email";
  userEmail.type = "text";
  userEmail.placeholder = "Email";
  const userEmailLabel = document.createElement("label");
  userEmailLabel.textContent = "Email:";
  userEmailLabel.setAttribute("for", "email");

  // create userPass input and label
  const userPass = document.createElement("input");
  userPass.classList.add("login-input");
  userPass.name = "password";
  userPass.id = "password";
  userPass.type = "password";
  userPass.placeholder = "Password";
  const userPassLabel = document.createElement("label");
  userPassLabel.textContent = "Password:";
  userPassLabel.setAttribute("for", "password");

  // create login button
  const loginSubmit = document.createElement("button");
  loginSubmit.classList.add("login-submit");
  loginSubmit.type = "submit";
  loginSubmit.textContent = "Login";

  // add event listener here
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // extract form data
    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    // make fetch POST request
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        // check if response is not ok (status 400, 500, etc.)
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.error || "Failed to login");
          });
        }
        return res.json();
      })
      .then((data) => {
        // store token
        localStorage.setItem("token", data.token);

        // set isAdmin
        localStorage.setItem("isAdmin", "true");

        // redirect
        window.location.href = "/admin/";

        // remove any existing error message
        const existingError = loginForm.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }
      })

      .catch((err) => {
        console.error("Error logging in:", err);

        // display error message to user
        let errorMsg = loginForm.querySelector(".error-message");
        if (!errorMsg) {
          errorMsg = document.createElement("div");
          errorMsg.classList.add("error-message");
          loginForm.insertBefore(errorMsg, loginForm.firstChild);
        }
        errorMsg.textContent = err.message;
      });
  });

  // append labels and inputs to form
  loginForm.appendChild(userEmailLabel);
  loginForm.appendChild(userEmail);
  loginForm.appendChild(userPassLabel);
  loginForm.appendChild(userPass);
  loginForm.appendChild(loginSubmit);

  // append login title container and title to login container
  loginContainer.appendChild(loginHeaderContainer);
  loginHeaderContainer.appendChild(loginHeader);

  // append login form
  loginContainer.appendChild(loginForm);

  app.appendChild(loginContainer);
}
