package com.galvanize.server.Post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class PostController {
    @Autowired
    private final PostRepository postRepository;

    public PostController(PostRepository postrepository) {
        this.postRepository = postrepository;
    }
}
