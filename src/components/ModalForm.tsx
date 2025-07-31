// Importa los hooks necesarios y el tipo Contact
import { useState, useEffect } from "react";
import { Contact } from "../App";

// Define las propiedades que recibe el modal
type Props = {
  onSubmit: (contact: Contact) => void; // Función que se ejecuta al enviar el formulario
  onClose: () => void; // Función para cerrar el modal
  editing: Contact | null; // Contacto que se está editando, o null si se está creando uno nuevo
};

// Componente que muestra un formulario dentro de un modal
function ModalForm({ onSubmit, onClose, editing }: Props) {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Si se está editando un contacto, carga sus datos en los inputs
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone);
    }
  }, [editing]);

  // Solo permite ingresar números en el campo de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPhone(value);
  };

  // Se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que todos los campos estén llenos
    if (!name || !email || !phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Envía el contacto al componente padre
    onSubmit({ name, email, phone });

    // Limpia los campos del formulario
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    // Modal personalizado (Bootstrap manual sin dependencias JS)
    <div
      className="modal fade show d-block" // Clases de Bootstrap para modal visible
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // Fondo semi-transparente
    >
      <div className="modal-dialog" role="document">
        <form onSubmit={handleSubmit} className="modal-content">
          {/* Encabezado del modal */}
          <div className="modal-header">
            <h5 className="modal-title">
              {editing ? "Editar contacto" : "Nuevo contacto"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose} // Cierra el modal al hacer clic en la X
            ></button>
          </div>

          {/* Cuerpo del modal con los campos del formulario */}
          <div className="modal-body">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-3"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={handlePhoneChange}
              className="form-control mb-3"
            />
          </div>

          {/* Pie del modal con botones de acción */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose} // Cierra el modal sin guardar
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editing ? "Actualizar" : "Agregar"}{" "}
              {/* Cambia según el contexto */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
