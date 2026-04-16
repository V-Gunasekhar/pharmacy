import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OrderForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const medicine = location.state?.medicine;

  const placeOrder = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/medicines/${medicine.id}/order`
      );

      alert("Order placed successfully");
      navigate("/medicines");
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🧾 Order Medicine</h2>
      <h3>{medicine.name}</h3>
      <p>₹{medicine.price}</p>
      <p>Stock: {medicine.quantity}</p>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default OrderForm;