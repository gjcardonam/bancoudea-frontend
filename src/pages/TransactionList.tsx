import { useState } from "react";
import { getTransactionsByAccount } from "../services/transactionService";
import { TransactionDTO } from "../types/Transaction";

export default function TransactionList() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const result = await getTransactionsByAccount(accountNumber);
      setTransactions(result);
    } catch (err: unknown) {
      setErrorMessage("No se pudieron cargar las transacciones.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Consultar Transacciones
          </h2>

          <form onSubmit={handleSearch} className="row g-3 mb-4">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                placeholder="Número de cuenta"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {transactions.length > 0 && (
            <>
              <h5 className="text-muted">
                Transacciones encontradas: {transactions.length}
              </h5>
              <div className="table-responsive">
                <table className="table table-striped table-bordered mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>Fecha</th>
                      <th>Cuenta Origen</th>
                      <th>Cuenta Destino</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td>{new Date(t.timestamp).toLocaleString()}</td>
                        <td>{t.senderAccountNumber}</td>
                        <td>{t.receiverAccountNumber}</td>
                        <td>${t.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {transactions.length === 0 && accountNumber && !errorMessage && (
            <p className="text-muted text-center">
              No se encontraron transacciones para esa cuenta.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
