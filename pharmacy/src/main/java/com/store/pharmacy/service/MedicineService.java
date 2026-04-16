package com.store.pharmacy.service;

import com.store.pharmacy.model.Medicine;
import com.store.pharmacy.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository repo;

    public MedicineService(MedicineRepository repo) {
        this.repo = repo;
    }

    // GET ALL MEDICINES
    public List<Medicine> getAll() {
        return repo.findAll();
    }

    // ADD MEDICINE
    public Medicine add(Medicine med) {
        return repo.save(med);
    }

    // UPDATE MEDICINE
    public Medicine update(Long id, Medicine updatedMedicine) {
        Medicine medicine = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setName(updatedMedicine.getName());
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setQuantity(updatedMedicine.getQuantity());

        return repo.save(medicine);
    }

    // DELETE MEDICINE
    public void delete(Long id) {
        repo.deleteById(id);
    }
    public Medicine reduceStock(Long id) {
        Medicine medicine = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        if (medicine.getQuantity() == null || medicine.getQuantity() <= 0) {
            throw new RuntimeException("Out of stock");
        }

        medicine.setQuantity(medicine.getQuantity() - 1);

        return repo.save(medicine);
    }
}