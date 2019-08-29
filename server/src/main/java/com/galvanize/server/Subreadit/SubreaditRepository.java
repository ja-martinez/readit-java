package com.galvanize.server.Subreadit;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface SubreaditRepository extends CrudRepository <Subreadit, Long> {
    @Query(value = "SELECT * FROM subreadits", nativeQuery = true)
    ArrayList<Subreadit> selectAllSubreadits();

    Subreadit findById(long id);
}
