import React from "react";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  prepareData() {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(data);
    this.props.LogInClicked(data);
  }
  render() {
    return (
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
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
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
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button
          onClick={() => this.prepareData()}
          class="input-group"
          id="login-button"
          type="button"
        >
          Continue
        </button>
        <p class="form-text">
          <a href="#" class="form-link">
            Forgot your Password?
          </a>
        </p>
        <p class="form-text">
          <a
            onClick={() => this.props.CreateAccountClicked()}
            class="form-link"
            id="linkCreateAccount"
          >
            Don't have an account? Create Account
          </a>
        </p>
      </form>
    );
  }
}

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordConfirm: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  prepareData() {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    this.props.AccountCreatedClicked(data);
  }

  render() {
    return (
      <>
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
            value={this.state.username}
            onChange={this.handleInputChange}
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
            value={this.state.email}
            onChange={this.handleInputChange}
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
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <div class="input-group">
          <input
            class="form-input"
            name="passwordConfirm"
            type="password"
            autofocus
            required
            placeholder="Confirm Password"
            value={this.state.passwordConfirm}
            onChange={this.handleInputChange}
          />
        </div>
        <button
          onClick={() => this.prepareData()}
          class="input-group"
          id="create-button"
          type="button"
        >
          Continue
        </button>
        <p class="form-text">
          <a
            onClick={() => this.props.AlreadyHaveAccount()}
            class="form-link"
            id="linkLogin"
          >
            Already have an account? Log in
          </a>
        </p>
      </>
    );
  }
}

class LogOut extends React.Component {
  render() {
    return (
      <>
        <button
          onClick={() => this.props.Clicked()}
          class="input-group"
          id="logout-button"
          type="submit"
        >
          log out
        </button>
      </>
    );
  }
}

class Greeting extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div class="welcome-text">
          <p id="log-in">You're signed in.</p>
        </div>
      );
    } else {
      return (
        <div class="welcome-text">
          <p id="log-in">Log-in and start your journey</p>
        </div>
      );
    }
  }
}

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      logIn: true,
    };
  }
  CreateAccountClicked() {
    this.setState({
      createAccount: true,
      logIn: false,
    });
  }
  AlreadyHaveAccount() {
    this.setState({
      createAccount: false,
      logIn: true,
    });
  }
  AccountCreatedClicked(input) {
    console.log(input);
    if (
      input.password === input.passwordConfirm &&
      input.username !== null &&
      input.email !== null &&
      input.password !== null
    ) {
      console.log("VALID");
      fetch("/api/v1/user", {
        method: "PUT",
        body: JSON.stringify({
          username: input.username,
          email: input.email,
          password: input.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "account created") {
            this.setState({
              createAccount: false,
              logIn: true,
            });
          } else {
            let messageElement = document.querySelector(
              ".create-account-error"
            );
            messageElement.textContent =
              "Failed to create Account. Please Try again.";
          }
        });
    } else {
      console.log("INVALID");
    }
  }
  LogInClicked(input) {
    if (input.username !== null) {
      console.log("VALID");
      fetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          username: input.username,
          password: input.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "log-in successful") {
            sessionStorage.setItem("token", input.username);
            this.setState({
              loggedIn: true,
            });
          } else {
            console.log("failed", sessionStorage);
          }
        });
    } else {
      console.log("INVALID");
    }
  }
  LogOutClicked() {
    sessionStorage.token = "";
    window.location.reload();
  }
  render() {
    if (sessionStorage.token && sessionStorage.token.length >= 1) {
      return (
        <>
          <Greeting loggedIn={sessionStorage.token} />
          <div class="profile-container">
            <LogOut Clicked={() => this.LogOutClicked()} />
          </div>
        </>
      );
    } else if (this.state.logIn) {
      return (
        <>
          <Greeting loggedIn={sessionStorage.token} />
          <div class="profile-container">
            <LogIn
              CreateAccountClicked={() => this.CreateAccountClicked()}
              LogInClicked={(input) => this.LogInClicked(input)}
            />
          </div>
        </>
      );
    } else if (this.state.createAccount) {
      return (
        <>
          <Greeting loggedIn={sessionStorage.token} />
          <div class="profile-container">
            <CreateAccount
              AccountCreatedClicked={(input) =>
                this.AccountCreatedClicked(input)
              }
              AlreadyHaveAccount={() => this.AlreadyHaveAccount()}
            />
          </div>
        </>
      );
    }
  }
}
