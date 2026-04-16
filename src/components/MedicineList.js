import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/medicines")
      .then((res) => {
        console.log("Medicines API Response:", res.data);
        setMedicines(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load medicines");
      });
  }, []);

  const orderMedicine = (medicine) => {
    const stock = medicine.quantity ?? 0;

    if (stock === 0) {
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
        medicines.map((m) => {
          const stock = m.quantity ?? 0;

          return (
            <div
              key={m.id}
              style={{
                border: "1px solid black",
                margin: 10,
                padding: 15,
                borderRadius: 8,
                width: 320,
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{m.name}</h3>

              <p>💰 Price: ₹{m.price}</p>

              <p style={{ fontSize: "18px" }}>
                📦 Available Stock Count:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color:
                      stock === 0
                        ? "red"
                        : stock <= 5
                        ? "orange"
                        : "green"
                  }}
                >
                  {stock}
                </span>
              </p>

              {stock === 0 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Out of Stock
                </p>
              )}

              <button
                disabled={stock === 0}
                onClick={() => orderMedicine(m)}
                style={{
                  padding: "8px 15px",
                  cursor:
                    stock === 0
                      ? "not-allowed"
                      : "pointer",
                  opacity: stock === 0 ? 0.5 : 1
                }}
              >
                {stock === 0
                  ? "Out of Stock"
                  : "🛒 Order"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MedicineList;