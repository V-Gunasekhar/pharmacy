package com.store.pharmacy.controller;

import com.store.pharmacy.model.Medicine;
import com.store.pharmacy.service.MedicineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicineController {

    private final MedicineService service;

    public MedicineController(MedicineService service) {
        this.service = service;
    }

    @GetMapping
    public List<Medicine> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Medicine add(@RequestBody Medicine med) {
        return service.add(med);
    }

    @PutMapping("/{id}/order")
    public Medicine orderMedicine(@PathVariable Long id) {
        return service.reduceStock(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine
    ) {
        return service.update(id, medicine);
    }
}