import React, { useState } from "react";
import "../../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import jsonConstants from "../../../Constants";
import { registerUser } from "../../../backendInterface/user/UserInterface";

const B2CRegistrationPage = () => {
  const [user, setUser] = useState({
    [jsonConstants.user.username]: "",
    [jsonConstants.user.firstName]: "",
    [jsonConstants.user.lastName]: "",
    [jsonConstants.user.mailAddress]: "",
    [jsonConstants.user.dateOfBirth]: "",
    [jsonConstants.user.password]: "",
  });

  let navigate = useNavigate();
  const [passwordRepetition, setPasswordRepetition] = useState("");

  const handleInputChange = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
  };

  const handlePasswordRepetitionChange = (event) => {
    setPasswordRepetition(event.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // TODO Komplexitätsprüfung aktivieren
    /*if (!isValidPassword(user[jsonConstants.user.password])) {
      alert(
        "Das Passwort muss mindestens 8 Zeichen lang sein, mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
      );
      return;
    }*/

    if (user[jsonConstants.user.password] !== passwordRepetition) {
      alert("Passwörter stimmen nicht überein");
    } else {
      try {
        console.log(user);
        const response = await registerUser(user);
        localStorage.setItem("userID", response.data.id);
        // TODO auf Seite navigieren
       
        let path = `/b2c/angebote`;
        navigate(path);


      } catch (e) {
        console.log(e);
      }
    }
  };

  const isValidPassword = (password) => {
    // Passwort muss mindestens 8 Zeichen lang sein
    if (password.length < 8) {
      return false;
    }

    // Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  };

  return (
    <div className="authBackground">
      <div className="authFormOuterContainer">
        <div className="authFormContainer">
          <form className="authForm" onSubmit={handleSubmit}>
            <h1>Registrieren</h1>
            <div className="authDoubleInput">
              <label htmlFor="first-name">
                Vorname
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="Text"
                  className="authInput"
                  value={user[jsonConstants.user.firstName]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.user.firstName)
                  }
                />
              </label>
              <label htmlFor="last-name">
                Nachname
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Text"
                  className="authInput"
                  value={user[jsonConstants.user.lastName]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.user.lastName)
                  }
                />
              </label>
            </div>
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
            <label htmlFor="mail">
              E-Mail-Adresse
              <input
                type="email"
                id="mail"
                name="mail"
                placeholder="Text"
                className="authInput"
                value={user[jsonConstants.user.mailAddress]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.user.mailAddress)
                }
              />
            </label>
            <label htmlFor="date-of-birth">
              Geburtsdatum
              <input
                type="date"
                id="date-of-birth"
                name="date-of-birth"
                placeholder="Text"
                className="authInput"
                value={user[jsonConstants.user.dateOfBirth]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.user.dateOfBirth)
                }
              />
            </label>
            <div className="authDoubleInput">
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
              <label htmlFor="password-repetition">
                Passwort wiederholen
                <input
                  type="password"
                  id="password-repetition"
                  name="password-repetition"
                  placeholder="Text"
                  className="authInput"
                  value={passwordRepetition}
                  onChange={(e) => handlePasswordRepetitionChange(e)}
                />
              </label>
            </div>
            <button className="primaryButton" type="submit">
              Registrieren
            </button>
            <p className="authLink">Du hast bereits einen Account?</p>
            <p className="authLink">
              <a href="/b2c/login">Hier anmelden!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2CRegistrationPage;
