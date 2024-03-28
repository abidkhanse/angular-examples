package org.example.simple_jwt_solution.services.imp;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ReservationDto;
import org.example.simple_jwt_solution.dto.ResultResponse;
import org.example.simple_jwt_solution.entities.Category;
import org.example.simple_jwt_solution.entities.Product;
import org.example.simple_jwt_solution.entities.Reservation;
import org.example.simple_jwt_solution.entities.ReservationStatus;
import org.example.simple_jwt_solution.repository.CategoryRepository;
import org.example.simple_jwt_solution.repository.ProductRepository;
import org.example.simple_jwt_solution.repository.ReservationRepository;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImp implements AdminService {

    public final CategoryRepository categoryRepository;
    public final ProductRepository productRepository;
    public final ReservationRepository reservationRepository;

    AdminServiceImp(CategoryRepository categoryRepository, ProductRepository productRepository, ReservationRepository reservationRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.reservationRepository = reservationRepository;
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

    @Override
    public ResultResponse deleteProduct(Integer productId) {

        ResultResponse response = new ResultResponse("Product ID" + productId);

        Optional<Product> optional = productRepository.findById(productId);
        if (optional.isPresent()) {
            productRepository.deleteById(productId);
            response.setStatus(HttpStatus.OK);
            response.setMessage(optional.get().getName() + " product removed successfully");
            response.setId(optional.get().getId());
        }

        return response;

    }

    @Override
    public ProductDto getProductById(Integer productId) {

        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.map(Product::getProductDto).orElse(null);

    }

    @Override
    public ResultResponse updateProduct(Integer productId, ProductDto productDto) throws IOException {

        ResultResponse response = new ResultResponse(productDto.getName());
        Optional<Product> optional = productRepository.findById(productId);

        if (optional.isPresent()) {

            Product product = optional.get();
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());

            if (productDto.getImg() != null) {
                product.setImg(productDto.getImg().getBytes());
            }

            product = productRepository.save(product);

            if (product.getId() > 0) {
                response.setStatus(HttpStatus.OK);
                response.setId(product.getId());
            }
        }

        return response;

    }

    @Override
    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream().map(Reservation::getReservationDto).toList();
    }

    @Override
    public ResultResponse changeReservationStatus(Integer reservationId, String status) {

        Optional<Reservation> optional = reservationRepository.findById(reservationId);

        ResultResponse response = new ResultResponse("Reservation");

        if (optional.isPresent()) {

            Reservation reservation = optional.get();
            reservation.setReservationStatus(status.equalsIgnoreCase("approved") ? ReservationStatus.APPROVED : ReservationStatus.DISAPPROVED);
            reservation = reservationRepository.save(reservation);
            response.setId(reservation.getId());
            response.setMessage(status);
            response.setStatus(HttpStatus.OK);

        }

        return response;

    }

}
