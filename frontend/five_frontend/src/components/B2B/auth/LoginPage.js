import React, { useState } from "react";
import "../../../styles/Auth.css";
import jsonConstants from "../../../Constants";
import { loginOrganization } from "../../../backendInterface/organization/OrganizationInterface";
import { useNavigate } from "react-router-dom";


const B2BLoginPage = () => {
  const [organization, setOrganization] = useState({
    [jsonConstants.organization.username]: "",
    [jsonConstants.organization.password]: "",
  });
  let navigate = useNavigate();
  const handleInputChange = (event, property) => {
    setOrganization({ ...organization, [property]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginOrganization(organization);
      localStorage.setItem("organizationID", response.data.id);

      let path = `/b2b/dashboard`;
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
                  value={organization[jsonConstants.organization.username]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.username)
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
                  value={organization[jsonConstants.organization.password]}
                  onChange={(e) =>
                    handleInputChange(e, jsonConstants.organization.password)
                  }
                />
              </label>
            </div>
            <button className="primaryButton" type="submit">
              Anmelden
            </button>
            <p className="authLink">Noch kein Account?</p>
            <p className="authLink">
              <a href="/b2b/register">Hier registieren!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2BLoginPage;
