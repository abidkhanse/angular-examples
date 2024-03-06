package org.example.simple_jwt_solution.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

@Data
public class CategoryDto {

    private Integer id;

    private String categoryName;

    private String description;

    private MultipartFile img;

    private byte[] returnedImg;

}