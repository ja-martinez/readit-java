package com.galvanize.server.Subreadit;

import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;

@Entity
@Data
@Table(name = "subreadits")
public class Subreadit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true)
    private String name;
}
