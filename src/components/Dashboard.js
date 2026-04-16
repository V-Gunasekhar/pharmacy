import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/medicines")
      .then((res) => setMedicines(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to load medicines");
      });
  }, []);

  const orderMedicine = (medicine) => {
    if (medicine.quantity === 0) {
      alert("This medicine is out of stock");
      return;
    }

    navigate("/order", {
      state: { medicine }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2>💊 Available Medicines</h2>

      {medicines.length === 0 ? (
        <p>No medicines available</p>
      ) : (
        medicines.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid black",
              margin: 10,
              padding: 15,
              borderRadius: 8,
              width: 300,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <h3>{m.name}</h3>

            <p>💰 Price: ₹{m.price}</p>

            <p>
              📦 Available Stock:{" "}
              <span
                style={{
                  color:
                    m.quantity === 0
                      ? "red"
                      : m.quantity <= 5
                      ? "orange"
                      : "green",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                {m.quantity}
              </span>
            </p>

            {m.quantity === 0 && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                Out of Stock
              </p>
            )}

            <button
              disabled={m.quantity === 0}
              onClick={() => orderMedicine(m)}
              style={{
                padding: "8px 15px",
                cursor:
                  m.quantity === 0
                    ? "not-allowed"
                    : "pointer",
                opacity: m.quantity === 0 ? 0.5 : 1
              }}
            >
              {m.quantity === 0
                ? "Out of Stock"
                : "🛒 Order"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MedicineList;