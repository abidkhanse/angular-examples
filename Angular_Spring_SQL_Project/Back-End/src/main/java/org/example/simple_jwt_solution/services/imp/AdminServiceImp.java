package org.example.simple_jwt_solution.services.imp;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.util.BeanUtil;
import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ResultResponse;
import org.example.simple_jwt_solution.entities.Category;
import org.example.simple_jwt_solution.entities.Product;
import org.example.simple_jwt_solution.repository.CategoryRepository;
import org.example.simple_jwt_solution.repository.ProductRepository;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImp implements AdminService {

    public final CategoryRepository categoryRepository;
    public final ProductRepository productRepository;
    AdminServiceImp(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    @Override
    public ResultResponse postCategory(CategoryDto categoryDto) throws IOException {

        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setImg(categoryDto.getImg().getBytes());

        Category result = categoryRepository.save(category);

        ResultResponse response = new ResultResponse(categoryDto.getName());

        if (result.getId() > 0) {
            response.setId(result.getId());
            response.setStatus(HttpStatus.OK);
            response.setMessage(categoryDto.getDescription());
        }

        return response;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDto).collect(Collectors.toList());
    }

    @Override
    public ResultResponse postProduct(Integer categoryId, ProductDto productDto) throws IOException {

        ResultResponse response = new ResultResponse(productDto.getName());

        Optional<Category> result = categoryRepository.findById(categoryId);

        if (result.isPresent()) {

            Product product = new Product();
            BeanUtils.copyProperties(productDto, product);
            product.setImg(productDto.getImg().getBytes());
            product.setCategory(result.get());
            Product productResult = productRepository.save(product);
            response.setId(productResult.getId());
            response.setStatus(HttpStatus.CREATED);
            response.setMessage("Product added to the database");

        }

        return response;

    }

    @Override
    public List<ProductDto> getAllProductsByCategory(Integer categoryId) {

        return productRepository.findAllByCategoryId(categoryId).stream().map(Product::getProductDto).collect(Collectors.toList());

    }

}
