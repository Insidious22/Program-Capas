// Importa los hooks de React y los componentes necesarios
import { useEffect, useState } from "react";
import ContactList from "./components/ContactList"; // Lista de contactos
import ModalForm from "./components/ModalForm"; // Formulario en modal

// Define el tipo Contacto
export type Contact = {
  name: string;
  email: string;
  phone: string;
};

function App() {
  // Estado que guarda los contactos, se inicializa desde localStorage si existe
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para manejar el contacto que está siendo editado (o null si no hay)
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para filtrar por letra inicial del nombre
  const [filterLetter, setFilterLetter] = useState<string>("Todos");

  // Estado para mostrar mensajes de advertencia (ej: contacto duplicado)
  const [message, setMessage] = useState<string | null>(null);

  // Estado para mostrar u ocultar el formulario modal
  const [showModal, setShowModal] = useState(false);

  // Guarda los contactos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Función para agregar o actualizar un contacto
  const addContact = (contact: Contact) => {
    // Verifica si ya existe un contacto con mismo email o nombre (excepto el que se está editando)
    const exists = contacts.some(
      (c) =>
        (c.email === contact.email || c.name === contact.name) &&
        c.email !== (editingContact?.email ?? "")
    );

    // Si ya existe, muestra un mensaje y termina
    if (exists) {
      setMessage("El contacto ya existe");
      setTimeout(() => setMessage(null), 3000); // Borra el mensaje después de 3 segundos
      return;
    }

    // Si se está editando, actualiza el contacto
    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.email === editingContact.email ? contact : c))
      );
      setEditingContact(null);
    } else {
      // Si no, añade un nuevo contacto
      setContacts([...contacts, contact]);
    }

    // Cierra el modal
    setShowModal(false);
  };

  // Elimina un contacto por email
  const deleteContact = (email: string) => {
    setContacts(contacts.filter((c) => c.email !== email));
  };

  // Inicia la edición de un contacto (abre el modal y carga el contacto a editar)
  const startEditing = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  // Aplica filtros de búsqueda y letra inicial
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLetter =
      filterLetter === "Todos" ||
      contact.name.toLowerCase().startsWith(filterLetter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  // Crea un arreglo con todas las letras del alfabeto (A-Z)
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Agenda de Contactos</h1>

      {/* Muestra un mensaje de error si existe */}
      {message && <div className="alert alert-danger">{message}</div>}

      {/* Barra de búsqueda y botón para agregar contacto */}
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
            setEditingContact(null); // Limpia el estado de edición
            setShowModal(true); // Abre el modal para agregar nuevo
          }}
        >
          Agregar contacto
        </button>
      </div>

      {/* Botones de filtro por letra inicial */}
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

      {/* Componente para listar los contactos filtrados */}
      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
        onEdit={startEditing}
      />

      {/* Muestra el formulario modal si está activo */}
      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)} // Cierra el modal
          onSubmit={addContact} // Acción al enviar el formulario
          editing={editingContact} // Si existe, se pasa para editar
        />
      )}
    </div>
  );
}

export default App;
