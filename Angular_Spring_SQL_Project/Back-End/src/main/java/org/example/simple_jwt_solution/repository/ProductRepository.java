package org.example.simple_jwt_solution.repository;

import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.entities.Category;
import org.example.simple_jwt_solution.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findAllByCategoryId(Integer categoryId);
}
