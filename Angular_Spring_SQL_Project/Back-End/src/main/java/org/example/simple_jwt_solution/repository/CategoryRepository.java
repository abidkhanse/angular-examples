package org.example.simple_jwt_solution.repository;

import org.example.simple_jwt_solution.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
}
