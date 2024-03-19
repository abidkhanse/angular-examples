package org.example.simple_jwt_solution.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.example.simple_jwt_solution.dto.CategoryDto;
import org.example.simple_jwt_solution.dto.ProductDto;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String price;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Category category;


    public ProductDto getProductDto() {

        ProductDto productDto = new ProductDto();
        productDto.setId(this.id);
        productDto.setName(this.name);
        productDto.setPrice(this.price);
        productDto.setDescription(this.description);
        productDto.setReturnedImg(this.img);
        productDto.setCategoryId(this.category.getId());
        productDto.setCategoryName(this.category.getName());

        return productDto;
    }
}
