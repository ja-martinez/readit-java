package com.galvanize.server.Comment_relationship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class Comment_relationshipController {
    @Autowired
    private final Comment_relationshipRepository comment_relationshipRepository;

    public Comment_relationshipController(Comment_relationshipRepository comment_relationshipRepository) {
        this.comment_relationshipRepository = comment_relationshipRepository;
    }
}
