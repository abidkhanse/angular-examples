package org.example.simple_jwt_solution.services.interfaces;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ResultResponse;

import java.io.IOException;
import java.util.List;

public interface CustomerService {

    //ResultResponse postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();

    List<ProductDto> getAllProductsByCategory(Integer categoryId);

    //ResultResponse postProduct(Integer categoryId, ProductDto productDto) throws IOException;

    //List<ProductDto> getAllProductsByCategory(Integer categoryId);

    //ResultResponse deleteProduct(Integer productId);

    //ProductDto getProductById(Integer productId);

    //ResultResponse updateProduct(Integer productId, ProductDto productDto) throws IOException;

}
