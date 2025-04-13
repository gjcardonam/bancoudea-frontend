import { useState } from "react";
import { transferMoney } from "../services/transactionService";
import { TransferRequestDTO } from "../types/Transaction";

export default function TransferMoney() {
  const [formData, setFormData] = useState<TransferRequestDTO>({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount: 0,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await transferMoney(formData);
      setSuccessMessage("✅ Transferencia realizada con éxito.");
      setFormData({
        senderAccountNumber: "",
        receiverAccountNumber: "",
        amount: 0,
      });
    } catch (err: unknown) {
      setErrorMessage("❌ Ocurrió un error al realizar la transferencia.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Transferir Dinero</h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Cuenta Origen</label>
              <input
                type="text"
                className="form-control"
                name="senderAccountNumber"
                value={formData.senderAccountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Cuenta Destino</label>
              <input
                type="text"
                className="form-control"
                name="receiverAccountNumber"
                value={formData.receiverAccountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Monto</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Transferir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
