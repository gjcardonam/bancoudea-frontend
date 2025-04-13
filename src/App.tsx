import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import CreateCustomer from "./pages/CreateCustomer";
import TransactionList from "./pages/TransactionList";
import TransferMoney from "./pages/TransferMoney";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Banco UdeA
          </Link>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crear-cliente">
                  Crear Cliente
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transacciones">
                  Transacciones
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transferencia">
                  Transferir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/crear-cliente" element={<CreateCustomer />} />
          <Route path="/transacciones" element={<TransactionList />} />
          <Route path="/transferencia" element={<TransferMoney />} />
        </Routes>
      </div>
    </Router>
  );
}
