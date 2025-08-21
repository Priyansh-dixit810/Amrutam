import './index.css';
function Navbar() {
  return (
    <nav className="navbar bg-white">
      <div className="container-fluid d-flex justify-content-between align-items-center flex-nowrap">
        <a
          className="navbar-brand fw-bold d-flex align-items-center flex-shrink-0"
          href="#"
        >
          <img
            src="/media/images/Logo.png"
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top me-2 logo-img"
          />
          <span className="brand-text">A M R U T A M</span>
        </a>
        <div className="d-flex align-items-center flex-shrink-0">
          <div className="text-end me-2">
            <h5 className="mb-0 name-text">Priyansh Dixit</h5>
            <span className="role-text">Admin</span>
          </div>
          <img
            src="/media/images/Admin.jpg"
            alt="admin"
            width="50"
            height="50"
            className="rounded-circle profile-img"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
