import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Panel */}

        <div className="col-lg-7 d-none d-lg-flex login-left">
          <div className="overlay">
            <div>
              <h1>NHDC Hospital CMS</h1>

              <p>
                Manage your hospital website from a single powerful dashboard.
              </p>

              <ul>
                <li>✔ Doctors Management</li>

                <li>✔ Services Management</li>

                <li>✔ Website CMS</li>

                <li>✔ Gallery & Videos</li>

                <li>✔ Appointments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel */}

        <div className="col-lg-5 d-flex align-items-center justify-content-center">
          <div className="login-card shadow">
            <div className="text-center mb-4">
              <h2>Welcome Back 👋</h2>

              <p>Login to continue</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
