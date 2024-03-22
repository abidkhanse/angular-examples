package org.example.simple_jwt_solution.controller;

import lombok.RequiredArgsConstructor;
import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ResultResponse;
import org.example.simple_jwt_solution.services.interfaces.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {

        List<CategoryDto> list = customerService.getAllCategories();
        if (list == null || list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{categoryId}/products")

    public ResponseEntity<List<ProductDto>> getAllProductsByCategory(@PathVariable Integer categoryId) {

        List<ProductDto> list = customerService.getAllProductsByCategory(categoryId);

        if (list == null || list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(list);

    }

/*


    @PostMapping("/{categoryId}/product")
    public ResponseEntity<ResultResponse> postProduct(@PathVariable Integer categoryId, ProductDto productDto) throws IOException {

        ResultResponse result = adminService.postProduct(categoryId, productDto);

        if (result.getId() < 0) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);

    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> getAllProductsByCategory(@PathVariable Integer categoryId) {

        List<ProductDto> list = adminService.getAllProductsByCategory(categoryId);
        if (list == null || list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(list);

    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<ResultResponse> deleteProduct(@PathVariable Integer productId) {

        ResultResponse result = adminService.deleteProduct(productId);
        if (result.getId() < 0) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer productId) {

        ProductDto productDto = adminService.getProductById(productId);
        if (productDto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(productDto);

    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<ResultResponse> updateProduct(@PathVariable Integer productId, @ModelAttribute ProductDto productDto) throws IOException {

        ResultResponse result = adminService.updateProduct(productId, productDto);
        if (result.getId() < 0) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);

    }
*/


}
