import React from 'react';
import Navbar from '../layout/Layout'
import "../../styles/Postfach.css"

const mockMessages = [
  {
    id: 1,
    name: "Martha Bitzer (Suppenküche Stuttgart West)",
    message: "Ja, wir haben Parkplätze direkt vor der Suppenküche. Alternativ sind wir auch gut mit öffentlichen Verkehrsmitteln erreichbar...",
    unread: true,
  },
  {
    id: 2,
    name: "Tobias Müller (DRK Kleiderkammer Bad Cannstatt)",
    message: "Es freut uns, dass du beim Kleidersortieren mit dabei bist! Hier zu...",
    unread: true,
  },
  {
    id: 3,
    name: "Lukas Schmidt (Stadtputz-Aktion Stuttgart)",
    message: "Du hilfst beim Müllsammeln und beim Kehren. Es gibt immer etwas zu tun!",
    unread: true,
  },
  {
    id: 4,
    name: "Sophia Fischer (Seniorenheim Stuttgart-West)",
    message: "Ja, bitte trage immer eine Maske und achte auf die Hygienevorschriften. Danke, dass du dabei bist!",
    unread: true,
  },
  {
    id: 5,
    name: "Maximilian Becker (DRK Blutspendedienste)",
    message: "Ja, wir bieten kurze Einweisungen zu Beginn deiner Schicht an, damit du dich zurechtfindest. Deine Unterstützung ist unglaublich wertvoll...",
    unread: false,
  },
  {
    id: 6,
    name: "Clara Weber (Obdachlosenhilfe Stuttgart)",
    message: "Wir freuen uns über dein Feedback! Du kannst uns gerne eine E-Mail schreiben oder uns vor Ort ansprechen.",
    unread: false,
  },
  {
    id: 7,
    name: "Daniela Wolf (Behindertenwerkstatt Kornwestheim)",
    message: "Richtig! Wir suchen noch immer Leute, die uns ein wenig unter die Arme greifen. Falls du mehr wissen willst, frage uns gerne!",
    unread: false,
  },
];

const Mailbox = () => {
  return (
    <Navbar>
    <div className="mailbox-container">
      <h1>Nachrichten</h1>
      <p className="unread-count">{mockMessages.filter(msg => msg.unread).length} ungelesene Nachrichten</p>
      <div className="message-list">
        {mockMessages.map((message, index) => (
          <div key={index} className={`message-item ${message.unread ? 'unread' : ''}`}>
            <div className="avatar">
              {message.name.charAt(0)}
            </div>
            <div className="message-content">
              <h2 className="message-name">{message.name}</h2>
              <p className="message-text">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default Mailbox;
