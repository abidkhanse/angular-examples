package org.example.simple_jwt_solution.controller;

import lombok.RequiredArgsConstructor;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.CategoryResponse;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/category")
    public ResponseEntity<CategoryResponse> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException, IOException {

        CategoryResponse result = adminService.postCategory(categoryDto);

        if (result.getId() < 0) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

}
