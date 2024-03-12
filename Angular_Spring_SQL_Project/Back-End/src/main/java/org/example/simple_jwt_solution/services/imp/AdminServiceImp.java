package org.example.simple_jwt_solution.services.imp;

import java.io.IOException;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.CategoryResponse;
import org.example.simple_jwt_solution.entities.Category;
import org.example.simple_jwt_solution.repository.CategoryRepository;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImp implements AdminService {

    public final CategoryRepository categoryRepository;

    AdminServiceImp(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponse postCategory(CategoryDto categoryDto) throws IOException {

        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setImg(categoryDto.getImg().getBytes());

        Category result = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse(categoryDto.getName());

        if (result.getId() > 0) {

            response.setId(result.getId());
            response.setStatus(HttpStatus.OK);
            response.setMessage(categoryDto.getDescription());

        }

        return response;

    }

}
