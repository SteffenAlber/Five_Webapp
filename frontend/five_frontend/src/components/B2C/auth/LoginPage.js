import React, { useState } from "react";
import "../../../styles/Auth.css";
import jsonConstants from "../../../Constants";
import { loginUser } from "../../../backendInterface/user/UserInterface";
import { useNavigate } from "react-router-dom";


const B2CLoginPage = () => {
  const [user, setUser] = useState({
    [jsonConstants.user.username]: "",
    [jsonConstants.user.password]: "",
  });
  let navigate = useNavigate();
  const handleInputChange = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(user);
      console.log(response.data.id);
      localStorage.setItem("userID", response.data.id);
      // TODO auf Seite navigieren
      let path = `/b2c/angebote`;
      navigate(path);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="authBackground">
      <div className="authFormOuterContainer">
        <div className="authFormContainer">
          <form className="authForm" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="authDoubleInput">
              <label htmlFor="username">
                Benutzername
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Text"
                  className="authInput"
                  value={user[jsonConstants.user.username]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.user.username)
                  }
                />
              </label>
              <label htmlFor="password">
                Passwort
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Text"
                  className="authInput"
                  value={user[jsonConstants.user.password]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.user.password)
                  }
                />
              </label>
            </div>
            <button className="primaryButton" type="submit">
              Anmelden
            </button>
            <p className="authLink">Noch kein Account?</p>
            <p className="authLink">
              <a href="/b2c/register">Hier registieren!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2CLoginPage;
