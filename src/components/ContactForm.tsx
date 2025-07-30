import { useState, useEffect } from "react";
import { Contact } from "../App";

type Props = {
  onAdd: (contact: Contact) => void;
  editing: Contact | null;
  visible: boolean;
  onClose: () => void;
};

function ContactForm({ onAdd, editing, visible, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [editing, visible]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onAdd({ name, email, phone });
  };

  if (!visible) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editing ? "Editar contacto" : "Nuevo contacto"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {editing ? "Actualizar" : "Agregar"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
