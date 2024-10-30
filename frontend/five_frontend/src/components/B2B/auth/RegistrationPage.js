import React, { useState } from "react";
import "../../../styles/Auth.css";
import jsonConstants from "../../../Constants";
import { checkValidPassword } from "../../../library/auth/AuthLibrary";
import { registerOrganization } from "../../../backendInterface/organization/OrganizationInterface";
import { useNavigate } from "react-router-dom";

const B2BRegistrationPage = () => {
  const [organization, setOrganization] = useState({
    [jsonConstants.organization.organizationName]: "",
    [jsonConstants.organization.username]: "",
    [jsonConstants.organization.mailAddress]: "",
    [jsonConstants.organization.zipCode]: "",
    [jsonConstants.organization.city]: "",
    [jsonConstants.organization.street]: "",
    [jsonConstants.organization.phoneNumber]: "",
    [jsonConstants.organization.link]: "",
    [jsonConstants.organization.password]: "",
  });
  let navigate = useNavigate();
  const [passwordRepetition, setPasswordRepetition] = useState("");

  const handleInputChange = (event, property) => {
    setOrganization({ ...organization, [property]: event.target.value });
  };

  const handlePasswordRepetitionChange = (event) => {
    setPasswordRepetition(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      checkValidPassword(
        organization[jsonConstants.organization.password],
        passwordRepetition,
      );
      const response = await registerOrganization(organization);
      localStorage.setItem("organizationID", response.data.id);

      let path = `/b2b/dashboard`;
      navigate(path);

    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="authBackground">
      <div className="authFormOuterContainer">
        <div className="authFormContainer">
          <form className="authForm" onSubmit={handleSubmit}>
            <h1>Registrieren</h1>
            <div className="authDoubleInput">
              <label htmlFor="organization">
                Organisation
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  placeholder="Text"
                  className="authInput"
                  value={
                    organization[jsonConstants.organization.organizationName]
                  }
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      jsonConstants.organization.organizationName,
                    )
                  }
                />
              </label>
              <label htmlFor="username">
                Benutzername
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Text"
                  className="authInput"
                  value={organization[jsonConstants.organization.username]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.username)
                  }
                />
              </label>
            </div>
            <label htmlFor="mail">
              E-Mail-Adresse
              <input
                type="email"
                id="mail"
                name="mail"
                placeholder="Text"
                className="authInput"
                value={organization[jsonConstants.organization.mailAddress]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.organization.mailAddress)
                }
              />
            </label>
            <div className="authDoubleInput">
              <label htmlFor="zipcode">
                Postleitzahl
                <input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  placeholder="12345"
                  className="authInput"
                  value={organization[jsonConstants.organization.zipCode]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.zipCode)
                  }
                />
              </label>
              <label htmlFor="city">
                Stadt
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Text"
                  className="authInput"
                  value={organization[jsonConstants.organization.city]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.city)
                  }
                />
              </label>
            </div>
            <label htmlFor="street">
              Straße und Hausnummer
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Text"
                className="authInput"
                value={organization[jsonConstants.organization.street]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.organization.street)
                }
              />
            </label>
            <label htmlFor="phoneNumber">
              Telefonnummer
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="00000000000000"
                className="authInput"
                value={organization[jsonConstants.organization.phoneNumber]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.organization.phoneNumber)
                }
              />
            </label>
            <label htmlFor="website">
              Link zur Webseite
              <input
                type="text"
                id="website"
                name="website"
                placeholder="Text"
                className="authInput"
                value={organization[jsonConstants.organization.link]}
                onChange={(e) =>
                  handleInputChange(e, jsonConstants.organization.link)
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
                  value={organization[jsonConstants.organization.password]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.password)
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
            <div className="checkbox">
              <input type="checkbox" required={true} id="dataSecurity" />
              <label htmlFor="dataSecurity" className="checkboxLabel">
                Hiermit stimme ich der Verarbeitung und der Weitergabe meiner
                Daten gemäß der Datenschutzrichtlinie zu
              </label>
            </div>
            <button className="primaryButton" type="submit">
              Registrieren
            </button>
            <p className="authLink">Du hast bereits einen Account?</p>
            <p className="authLink">
              <a href="/b2b/login">Hier anmelden!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2BRegistrationPage;
