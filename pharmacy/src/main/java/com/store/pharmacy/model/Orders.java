package com.store.pharmacy.model;


import jakarta.persistence.*;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private Long medicineId;
    private int quantity;
    private String prescriptionUrl;
    private String status;

    public Orders() {}

    public Long getId() { return id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getPrescriptionUrl() { return prescriptionUrl; }
    public void setPrescriptionUrl(String prescriptionUrl) { this.prescriptionUrl = prescriptionUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
