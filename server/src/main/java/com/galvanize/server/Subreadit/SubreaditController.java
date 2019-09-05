package com.galvanize.server.Subreadit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class SubreaditController {
    @Autowired
    private final SubreaditRepository subreaditRepository;

    public SubreaditController(SubreaditRepository subreaditRepository) {
        this.subreaditRepository = subreaditRepository;
    }

    @GetMapping("/subreadits")
    public ArrayList<Subreadit> getSubreadits() {
        return subreaditRepository.selectAllSubreadits();
    }
}
