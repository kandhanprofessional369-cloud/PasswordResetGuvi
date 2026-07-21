function AuthLayout({ title, children }) {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "420px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;