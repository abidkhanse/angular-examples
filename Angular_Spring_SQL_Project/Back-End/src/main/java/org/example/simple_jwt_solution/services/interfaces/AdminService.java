package org.example.simple_jwt_solution.services.interfaces;

import java.io.IOException;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.CategoryResponse;

public interface AdminService {

    CategoryResponse postCategory(CategoryDto categoryDto) throws IOException;

}
