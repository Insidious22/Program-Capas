// Importa los hooks de React y el tipo Contact desde App
import { useState, useEffect } from "react";
import { Contact } from "../App";

// Define las props esperadas por el componente
type Props = {
  onAdd: (contact: Contact) => void; // Función para agregar o actualizar un contacto
  editing: Contact | null; // Contacto a editar (si existe), o null si se está creando uno nuevo
};

// Componente del formulario para crear o editar un contacto
function ContactForm({ onAdd, editing }: Props) {
  // Estados locales para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Efecto que se ejecuta cuando se pasa un contacto para editar
  useEffect(() => {
    if (editing) {
      // Carga los datos del contacto en los campos
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone);
    }
  }, [editing]); // Se ejecuta cada vez que cambia el contacto a editar

  // Controla el campo de teléfono, solo permite números
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value); // Solo actualiza si son dígitos
    }
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene recarga de página

    // Verifica que todos los campos estén llenos
    if (!name || !email || !phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Llama a la función onAdd con los datos del contacto
    onAdd({ name, email, phone });

    // Limpia los campos después de agregar/editar
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Campo de nombre */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Campo de correo */}
      <div className="mb-3">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Campo de teléfono */}
      <div className="mb-3">
        <input
          type="tel"
          placeholder="Teléfono"
          value={phone}
          onChange={handlePhoneChange}
          className="form-control"
        />
      </div>

      {/* Botón de enviar */}
      <button type="submit" className="btn btn-primary">
        {editing ? "Actualizar" : "Agregar"}{" "}
        {/* Cambia el texto según el modo */}
      </button>
    </form>
  );
}

export default ContactForm;
