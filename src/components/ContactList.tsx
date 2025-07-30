import { Contact } from "../App";

type Props = {
  contacts: Contact[];
  onDelete: (email: string) => void;
  onEdit: (contact: Contact) => void;
};

function ContactList({ contacts, onDelete, onEdit }: Props) {
  const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul className="list-group">
      {sorted.map((contact) => (
        <li
          key={contact.email}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>
            <strong>{contact.name}</strong>
            <br />
            {contact.email} - {contact.phone}
          </span>
          <div>
            <button
              onClick={() => onEdit(contact)}
              className="btn btn-sm btn-warning me-2"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(contact.email)}
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
