package org.example.simple_jwt_solution.controller;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/category")
    public ResponseEntity<CategoryDto> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException {
        CategoryDto result = adminService.postCategory(categoryDto);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

}
