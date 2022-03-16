import { Link } from "react-router-dom";
import { FaRegListAlt, FaMoneyCheckAlt, FaClipboardList } from "react-icons/fa";



const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Rizwan Chipa</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/"><FaRegListAlt /> New Items</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/bill"><FaMoneyCheckAlt /> Generate Bill</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/all_bill"><FaClipboardList /> All Bills</Link>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;