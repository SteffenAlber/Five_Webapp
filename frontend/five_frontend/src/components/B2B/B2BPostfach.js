import React from 'react';
import Navbar from '../layout/Layout'
import "../../styles/Postfach.css"

const mockMessages = [
  {
    id: 1,
    name: "Anna Braun",
    message: "Das klingt super, danke für die Info! Eine letzte Frage: Gibt es vor Ort Parkmöglichk...",
    unread: true,
  },
  {
    id: 2,
    name: "Peter Munster",
    message: "Welche Kleidung ist für den Einsatz am besten geeignet?",
    unread: true,
  },
  {
    id: 3,
    name: "Isabelle Rot",
    message: "Klasse, dass du mitmachst! Deine Hilfe wird einen großen Unterschied machen. Bis b...",
    unread: false,
  },
  {
    id: 4,
    name: "Lena Herz",
    message: "Wir freuen uns, dass du dich für einen Freiwilligen-Einsatz bei uns entschieden hast.",
    unread: false,
  },
  {
    id: 5,
    name: "Frank Baum",
    message: "Du wirst bei der Essensausgabe und im Küchenbereich helfen. Es gibt immer etwas z...",
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
