import "./Profile.css";

function Profile() {
  return (
    <>
      <div class="welcome-text">
        <p id="log-in">Log-in and start your journey</p>
      </div>
      <div class="profile-container">
        <form class="form" id="login">
          <h1 class="form-title">Log in</h1>
          <br />
          <br />
          <div class="form-message form-message-error login-error"></div>
          <div class="input-group">
            <input
              class="form-input"
              name="username"
              type="text"
              autofocus
              required
              placeholder="Username or email"
            />
          </div>
          <div class="input-group">
            <input
              class="form-input"
              name="password"
              type="password"
              autofocus
              required
              placeholder="Password"
            />
          </div>
          <button class="input-group" id="login-button" type="submit">
            Continue
          </button>
          <p class="form-text">
            <a href="#" class="form-link">
              Forgot your Password?
            </a>
          </p>
          <p class="form-text">
            <a class="form-link" id="linkCreateAccount">
              Don't have an account? Create Account
            </a>
          </p>
        </form>

        <form class="form form--hidden" id="createAccount">
          <h1 class="form-title">Create Account</h1>
          <br />
          <br />
          <div class="form-message form-message-error create-account-error"></div>
          <div class="input-group">
            <input
              type="text"
              class="form-input"
              name="username"
              required
              autofocus
              placeholder="Username"
            />
          </div>
          <div class="input-group">
            <input
              class="form-input"
              name="email"
              type="text"
              required
              autofocus
              placeholder="Email Address"
            />
          </div>
          <div class="input-group">
            <input
              class="form-input"
              name="password"
              type="password"
              autofocus
              required
              placeholder="Password"
            />
          </div>
          <div class="input-group">
            <input
              class="form-input"
              name="password-confirm"
              type="password"
              autofocus
              required
              placeholder="Confirm Password"
            />
          </div>
          <button class="input-group" id="create-button" type="submit">
            Continue
          </button>
          <p class="form-text">
            <a class="form-link" id="linkLogin">
              Already have an account? Log in
            </a>
          </p>
        </form>
        <form class="form form--hidden" id="logout">
          <h1 class="form-logout">You're signed in.</h1>
          <br />
          <br />
          <button class="input-group" id="logout-button" type="submit">
            log out
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
