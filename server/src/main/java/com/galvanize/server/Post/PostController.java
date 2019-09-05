package com.galvanize.server.Post;

import com.galvanize.server.Subreadit.Subreadit;
import com.galvanize.server.Subreadit.SubreaditRepository;
import com.galvanize.server.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class PostController {
    @Autowired
    private final PostRepository postRepository;
    private final SubreaditRepository subreaditRepository;
    private final UserRepository userRepository;

    public PostController(PostRepository postrepository, SubreaditRepository subreaditRepository, UserRepository userRepository) {

        this.postRepository = postrepository;
        this.subreaditRepository = subreaditRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/posts")
    public List getAllPosts() {
        List<Object[]> posts = postRepository.selectAllPosts();
        List response = posts.stream()
                .map(post -> new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]))
                .collect(Collectors.toList());
        return response;
    }

    @GetMapping("/users/{user_id}/posts")
    public List getAllPostsByUser(@PathVariable String user_id) {
        List<Object[]> posts = postRepository.selectPostsByUserId(Integer.parseInt(user_id));
        List response = posts.stream()
                .map(post -> new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]))
                .collect(Collectors.toList());
        return response;
    }

    @GetMapping("/subreadits/{subreadit_id}/posts")
    public List getAllPostsBySubreadit(@PathVariable String subreadit_id) {
        List<Object[]> posts = postRepository.selectPostsBySubreaditId(Integer.parseInt(subreadit_id));
        List response = posts.stream()
                .map(post -> new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]))
                .collect(Collectors.toList());
        return response;
    }

    @GetMapping("/posts/{post_id}")
    public PostResponse getPostById(@PathVariable String post_id) {
        Object[] post = postRepository.selectPostById(Integer.parseInt(post_id)).get(0);
        PostResponse response = new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]);
        return response;
    }

    @PatchMapping("/posts/{post_id}")
    public PostResponse updatePost(@PathVariable String post_id, @RequestBody Post postBody) {
        postRepository.updatePost(postBody.getTitle(), postBody.getContent(), postBody.getLink_url(), Integer.parseInt(post_id));
        Object[] post = postRepository.selectPostById(Integer.parseInt(post_id)).get(0);
        PostResponse response = new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]);
        return response;
    }

    @DeleteMapping("/posts/{post_id}")
    public PostResponse deletePost(@PathVariable String post_id) {
        Object[] post = postRepository.selectPostById(Integer.parseInt(post_id)).get(0);
        PostResponse response = new PostResponse(post[0], post[1], post[2], post[3], post[4], post[5], post[6]);
        postRepository.deleteById(Long.parseLong(post_id));
        return response;
    }

    // no need to return the whole object so it's returning post type
    @PostMapping("/posts")
    public Post createPost(@RequestBody HashMap<String, String> info) {
        Post post = new Post();
        post.setTitle(info.get("title"));
        post.setContent(info.get("content"));
        post.setLink_url(info.get("link_url"));
        post.setSubreadit(subreaditRepository.findById(Long.parseLong(info.get("subreadit_id"))));
        post.setUser(userRepository.findById(Long.parseLong(info.get("user_id"))));
        return postRepository.save(post);
    }

    @PatchMapping("posts/{post_id}/upvote")
    public Post upvotePost(@PathVariable String post_id) {
        return postRepository.upvoteById(Long.parseLong(post_id));
    }

    @PatchMapping("posts/{post_id}/downvote")
    public Post downvotePost(@PathVariable String post_id) {
        return postRepository.downvoteById(Long.parseLong(post_id));
    }
}
