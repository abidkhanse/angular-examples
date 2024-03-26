package org.example.simple_jwt_solution.services.imp;

import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.example.simple_jwt_solution.dto.ReservationDto;
import org.example.simple_jwt_solution.dto.ResultResponse;
import org.example.simple_jwt_solution.entities.*;
import org.example.simple_jwt_solution.repository.CategoryRepository;
import org.example.simple_jwt_solution.repository.ProductRepository;
import org.example.simple_jwt_solution.repository.ReservationRepository;
import org.example.simple_jwt_solution.repository.UserRepository;
import org.example.simple_jwt_solution.services.interfaces.AdminService;
import org.example.simple_jwt_solution.services.interfaces.CustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImp implements CustomerService {

    public final CategoryRepository categoryRepository;
    public final ProductRepository productRepository;
    public final ReservationRepository reservationRepository;

    public final UserRepository userRepository;

    CustomerServiceImp(CategoryRepository categoryRepository, ProductRepository productRepository, ReservationRepository reservationRepository, UserRepository userRepository) {

        this.categoryRepository     = categoryRepository;
        this.productRepository      = productRepository;
        this.reservationRepository  = reservationRepository;
        this.userRepository         = userRepository;

    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getAllProductsByCategory(Integer categoryId) {
        return productRepository.findAllByCategoryId(categoryId).stream().map(Product::getProductDto).collect(Collectors.toList());
    }

    @Override
    public ResultResponse postReservation(ReservationDto reservationDto) {

        Optional<User> optional = userRepository.findById(reservationDto.getCustomerId());

        ResultResponse response = new ResultResponse(reservationDto.getTableType());

        if (optional.isPresent()) {

            Reservation reservation = new Reservation();
            reservation.setTableType(reservationDto.getTableType());
            reservation.setDateTime(reservationDto.getDateTime());
            reservation.setDescription(reservationDto.getDescription());
            reservation.setUser(optional.get());
            reservation.setReservationStatus(ReservationStatus.PENDING);

            Reservation reservation1 = reservationRepository.save(reservation);
            response.setId(reservation1.getId());
            response.setStatus(HttpStatus.CREATED);
            response.setMessage("Table reservation request received");

        }

        return response;

    }

    @Override
    public List<ReservationDto> getAllReservationsByUser(Integer customerId) {

        return reservationRepository.findAllByUserId(customerId).stream().map(Reservation::getReservationDto).toList();

    }


    /*
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

     */

}
