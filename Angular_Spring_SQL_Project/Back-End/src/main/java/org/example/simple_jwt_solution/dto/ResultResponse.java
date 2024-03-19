package org.example.simple_jwt_solution.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ResultResponse {

    private Integer id;

    private String name;

    private HttpStatus status;

    private String message;

    public ResultResponse(String name) {
        this.message = "unsuccessful";
        this.status = HttpStatus.BAD_REQUEST;
        this.id = -1;
        this.name = name;
    }

}