package com.store.pharmacy.service;

import com.store.pharmacy.model.Medicine;
import com.store.pharmacy.model.Orders;
import com.store.pharmacy.repository.MedicineRepository;
import com.store.pharmacy.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final MedicineRepository medRepo;

    public OrderService(OrderRepository orderRepo, MedicineRepository medRepo) {
        this.orderRepo = orderRepo;
        this.medRepo = medRepo;
    }

    // 🛒 Place order and reduce stock
    public Orders placeOrder(Orders order) {
        Medicine medicine = medRepo.findById(order.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        if (medicine.getQuantity() == null || medicine.getQuantity() <= 0) {
            throw new RuntimeException("Out of stock");
        }

        if (order.getQuantity() > medicine.getQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        // 📦 reduce stock
        medicine.setQuantity(
                medicine.getQuantity() - order.getQuantity()
        );

        medRepo.save(medicine);

        order.setStatus("PLACED");

        return orderRepo.save(order);
    }

    // 📋 Get all orders
    public List<Orders> getAllOrders() {
        return orderRepo.findAll();
    }

    // 📉 Reduce stock by 1
    public Medicine reduceStock(Long id) {
        Medicine medicine = medRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        if (medicine.getQuantity() == null || medicine.getQuantity() <= 0) {
            throw new RuntimeException("Out of stock");
        }

        medicine.setQuantity(medicine.getQuantity() - 1);

        return medRepo.save(medicine);
    }
    public Medicine update(Long id, Medicine updatedMedicine) {
        Medicine medicine = medRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setName(updatedMedicine.getName());
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setQuantity(updatedMedicine.getQuantity());

        return medRepo.save(medicine);
    }
}