package com.galvanize.server.Subreadit;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "subreadits")
public class Subreadit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;
}
