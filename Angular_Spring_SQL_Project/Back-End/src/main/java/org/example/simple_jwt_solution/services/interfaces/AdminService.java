package org.example.simple_jwt_solution.services.interfaces;

import java.io.IOException;

import org.example.simple_jwt_solution.dto.CategoryDto;

public interface AdminService {

    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

}
