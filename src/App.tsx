import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

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
    } else {
      setContacts([...contacts, contact]);
    }

    setEditingContact(null);
    setShowModal(false);
  };

  const deleteContact = (email: string) => {
    setContacts(contacts.filter((c) => c.email !== email));
  };

  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Agenda de Contactos</h1>

      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}

      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
        />
        <button className="btn btn-success" onClick={handleAddNew}>
          Agregar contacto
        </button>
      </div>

      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
        onEdit={startEditing}
      />

      <ContactForm
        onAdd={addContact}
        editing={editingContact}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;
