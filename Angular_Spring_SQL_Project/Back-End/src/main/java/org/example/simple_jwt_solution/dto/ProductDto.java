package org.example.simple_jwt_solution.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDto {

    private Integer id;

    private String name;

    private String description;

    private String price;

    private MultipartFile img;

     private byte[] returnedImg;

     private Integer categoryId;

     private String categoryName;

}