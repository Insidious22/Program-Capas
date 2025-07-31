// Importa el tipo Contact desde App.tsx
import { Contact } from "../App";

// Define las props que recibe este componente
type Props = {
  contacts: Contact[]; // Lista de contactos a mostrar
  onDelete: (email: string) => void; // Función que se llama al eliminar un contacto
  onEdit: (contact: Contact) => void; // Función que se llama al editar un contacto
};

// Componente que muestra la lista de contactos
function ContactList({ contacts, onDelete, onEdit }: Props) {
  // Crea una copia ordenada alfabéticamente por nombre
  const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul className="list-group">
      {/* Itera sobre la lista ordenada de contactos */}
      {sorted.map((contact) => (
        <li
          key={contact.email} // Usa el email como clave única
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* Parte izquierda: avatar + info del contacto */}
          <div className="d-flex align-items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                contact.name
              )}&background=random&rounded=true`} // Genera una imagen automática usando el nombre
              alt={contact.name}
              width="40"
              height="40"
              className="rounded-circle"
            />
            <div>
              <strong>{contact.name}</strong>
              <br />
              {contact.email} - {contact.phone}
            </div>
          </div>

          {/* Parte derecha: botones de editar y eliminar */}
          <div>
            <button
              onClick={() => onEdit(contact)} // Llama a la función onEdit con el contacto actual
              className="btn btn-sm btn-warning me-2"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(contact.email)} // Llama a la función onDelete con el email
              className="btn btn-sm btn-danger"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
