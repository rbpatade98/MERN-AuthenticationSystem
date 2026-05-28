import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData);
      
      alert("LOGIN SUCCESSFUL");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "LOGIN FAILED");
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.header}>
          <p style={styles.label}>BMW M AUTHENTICATION</p>
          <h1 style={styles.heading}>LOGIN</h1>
          {/* M Stripe */}
          <div style={styles.stripeWrapper}>
            <div style={styles.blueLight}></div>
            <div style={styles.blueDark}></div>
            <div style={styles.red}></div>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="off"
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "LOADING..." : "LOGIN"}
        </button>

        <p style={styles.text}>
          DON'T HAVE AN ACCOUNT?{" "}
          <Link to="/register" style={styles.link}>
            REGISTER
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#000000",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    padding: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    background: "#0d0d0d",
    border: "1px solid #3c3c3c",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    marginBottom: "10px",
  },
  label: {
    fontSize: "13px",
    letterSpacing: "2px",
    color: "#bbbbbb",
    marginBottom: "10px",
    margin: 0,
  },
  heading: {
    fontSize: "48px",
    fontWeight: "700",
    margin: "10px 0 0 0",
    letterSpacing: "1px",
  },
  stripeWrapper: {
    display: "flex",
    marginTop: "20px",
    width: "140px",
    height: "4px",
  },
  blueLight: {
    flex: 1,
    background: "#0066b1",
  },
  blueDark: {
    flex: 1,
    background: "#1c69d4",
  },
  red: {
    flex: 1,
    background: "#e22718",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    background: "#1a1a1a",
    border: "1px solid #3c3c3c",
    color: "#ffffff",
    padding: "16px",
    outline: "none",
    fontSize: "14px",
    letterSpacing: "1px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    height: "54px",
    background: "#ffffff",
    border: "none",
    color: "#000000",
    cursor: "pointer",
    letterSpacing: "2px",
    fontWeight: "700",
    fontSize: "14px",
    marginTop: "10px",
    transition: "background 0.2s",
  },
  text: {
    color: "#7e7e7e",
    textAlign: "center",
    fontSize: "12px",
    letterSpacing: "1px",
    margin: 0,
    marginTop: "10px",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;
