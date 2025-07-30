import { useState, useEffect } from "react";
import { Contact } from "../App";

type Props = {
  onAdd: (contact: Contact) => void;
  editing: Contact | null;
};

function ContactForm({ onAdd, editing }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone);
    }
  }, [editing]);

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
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
      <button type="submit" className="btn btn-primary">
        {editing ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

export default ContactForm;
