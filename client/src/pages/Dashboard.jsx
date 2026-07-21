import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <div className="card shadow p-4">

              <h2 className="text-center mb-3">
                Dashboard
              </h2>

              <h4 className="text-center">
                👋 Welcome to Password Reset System
              </h4>

              <p className="text-center text-muted mt-3">
                You are logged in successfully.
              </p>

              <hr />

              <div className="text-center">
                <h5>Session Status</h5>

                <span className="badge bg-success fs-6"><i class="bi bi-check-circle-fill"></i> Active
                  
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;