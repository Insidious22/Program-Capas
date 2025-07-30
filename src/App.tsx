import { useEffect, useState } from "react";
import ContactList from "./components/ContactList";
import ModalForm from "./components/ModalForm";

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLetter, setFilterLetter] = useState<string>("Todos");
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Contact) => {
    const exists = contacts.some(
      (c) =>
        (c.email === contact.email || c.name === contact.name) &&
        c.email !== (editingContact?.email ?? "")
    );

    if (exists) {
      setMessage("El contacto ya existe");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.email === editingContact.email ? contact : c))
      );
      setEditingContact(null);
    } else {
      setContacts([...contacts, contact]);
    }

    setShowModal(false);
  };

  const deleteContact = (email: string) => {
    setContacts(contacts.filter((c) => c.email !== email));
  };

  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLetter =
      filterLetter === "Todos" ||
      contact.name.toLowerCase().startsWith(filterLetter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Agenda de Contactos</h1>

      {message && <div className="alert alert-danger">{message}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-3"
          style={{ maxWidth: "300px" }}
        />
        <button
          className="btn btn-success"
          onClick={() => {
            setEditingContact(null);
            setShowModal(true);
          }}
        >
          Agregar contacto
        </button>
      </div>

      <div className="mb-3 d-flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${
            filterLetter === "Todos" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilterLetter("Todos")}
        >
          Todos
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`btn btn-sm ${
              filterLetter === letter ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilterLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
        onEdit={startEditing}
      />

      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          onSubmit={addContact}
          editing={editingContact}
        />
      )}
    </div>
  );
}

export default App;
