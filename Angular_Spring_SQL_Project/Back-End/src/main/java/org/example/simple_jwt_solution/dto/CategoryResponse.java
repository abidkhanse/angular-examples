package org.example.simple_jwt_solution.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryResponse {

    private Integer id;

    private String name;

    private HttpStatus status;

    private String message;

    public CategoryResponse(String name) {
        this.message = "unsuccessful";
        this.status = HttpStatus.BAD_REQUEST;
        this.id = -1;
        this.name = name;
    }

}