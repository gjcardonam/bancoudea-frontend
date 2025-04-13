import { useEffect, useState } from "react";
import { getAllCustomers } from "../services/customerService";
import { CustomerDTO } from "../types/Customer";

export default function CustomerList() {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);

  useEffect(() => {
    getAllCustomers().then(setCustomers);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Clientes</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          {customers.length === 0 ? (
            <p className="text-muted text-center">
              No hay clientes registrados.
            </p>
          ) : (
            <ul className="list-group">
              {customers.map((c) => (
                <li
                  key={c.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>
                      {c.firstName} {c.lastName}
                    </strong>
                    <br />
                    <small className="text-muted">
                      Cuenta: {c.accountNumber}
                    </small>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    ${c.balance.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
