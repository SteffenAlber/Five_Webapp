export const checkPassword = () => {};

export const checkValidPassword = (password, passwordRepetition) => {
  if (password !== passwordRepetition) {
    throw Error("Passwörter stimmen nicht überein");
  }

  // Passwort muss mindestens 8 Zeichen lang sein
  // TODO Komplexitätsprüfung aktivieren
  /*if (password.length < 8) {
    throw Error("Passwort muss mindestens 8 Zeichen lang sein");
  }

  // Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
    throw Error(
      "Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
    );
  }*/
};
