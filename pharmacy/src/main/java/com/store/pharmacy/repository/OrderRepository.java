
package com.store.pharmacy.repository;

import com.store.pharmacy.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
