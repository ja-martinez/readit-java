package com.galvanize.server.Subreadit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class SubreaditController {
    @Autowired
    private final SubreaditRepository subreaditRepository;

    public SubreaditController(SubreaditRepository subreaditRepository) {
        this.subreaditRepository = subreaditRepository;
    }
}
