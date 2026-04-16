import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>🛠️ Admin Dashboard</h1>
      <h3>Welcome {user?.username}</h3>

      <button onClick={() => navigate("/medicines")}>
        📦 Manage Medicines
      </button>

      <br /><br />

      <button onClick={() => alert("Add Medicine")}>
        ➕ Add Medicine
      </button>

      <br /><br />

      <button onClick={() => alert("Update Stock")}>
        ✏️ Update Stock
      </button>

      <br /><br />

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;