import { useState } from "react";
import { createCustomer } from "../services/customerService";
import { CustomerDTO } from "../types/Customer";

export default function CreateCustomer() {
  const [formData, setFormData] = useState<Omit<CustomerDTO, "id">>({
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: 0,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "balance" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await createCustomer(formData);
      setSuccessMessage("✅ Cliente creado exitosamente.");
      setFormData({
        firstName: "",
        lastName: "",
        accountNumber: "",
        balance: 0,
      });
    } catch (err: unknown) {
      setErrorMessage("❌ Ocurrió un error al crear el cliente.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Crear Cliente</h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Cuenta</label>
              <input
                type="text"
                className="form-control"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Saldo Inicial</label>
              <input
                type="number"
                className="form-control"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Crear Cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
