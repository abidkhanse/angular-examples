package org.example.simple_jwt_solution.services.interfaces;

import java.io.IOException;
import java.util.List;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ResultResponse;
import org.example.simple_jwt_solution.entities.Product;

public interface AdminService {

    ResultResponse postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();

    ResultResponse postProduct(Integer categoryId, ProductDto productDto) throws IOException;

    List<ProductDto> getAllProductsByCategory(Integer categoryId);
}
