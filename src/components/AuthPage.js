import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // 🔐 LOGIN
  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username.trim(),
          password: password.trim()
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  // 📝 REGISTER
  const register = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
          role: "USER"
        }
      );

      alert("Registered successfully");
      setIsLogin(true);

      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      alert(err.response?.data || "Register failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🏥 Pharmacy System</h2>

      <h3>{isLogin ? "Login" : "Register"}</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      {!isLogin && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />
        </>
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {isLogin ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={register}>Register</button>
      )}

      <br /><br />

      <p
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Create account"
          : "Already have account? Login"}
      </p>
    </div>
  );
}

export default AuthPage;