package org.example.simple_jwt_solution.entities;

import jakarta.persistence.*;
import lombok.Data;

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

}
