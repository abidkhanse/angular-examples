package org.example.simple_jwt_solution.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.example.simple_jwt_solution.dto.CategoryDto;

@Data
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    public CategoryDto getCategoryDto() {

        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(this.id);
        categoryDto.setName(this.name);
        categoryDto.setDescription(this.description);
        categoryDto.setReturnedImg(this.img);

        return categoryDto;

    }



}
