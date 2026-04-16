package com.store.pharmacy.controller;

import java.util.List;
import com.store.pharmacy.model.Orders;
import com.store.pharmacy.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public Orders placeOrder(@RequestBody Orders order) {
        return service.placeOrder(order);
    }

    // ✅ GET ALL ORDERS
    @GetMapping
    public List<Orders> getAllOrders() {
        return service.getAllOrders();
    }
}
