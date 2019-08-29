package com.galvanize.server.Post;

import com.galvanize.server.Subreadit.Subreadit;
import com.galvanize.server.Subreadit.SubreaditRepository;
import com.galvanize.server.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

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
    public ArrayList<Post> getAllPosts() {
        return postRepository.selectAllPosts();
    }

    @GetMapping("/users/{user_id}/posts")
    public ArrayList<Post> getAllPostsByUser(@PathVariable String user_id) {
        return postRepository.selectPostsByUserId(Integer.parseInt(user_id));
    }

    @GetMapping("/subreadits/{subreadit_id}/posts")
    public ArrayList<Post> getAllPostsBySubreadit(@PathVariable String subreadit_id) {
        return postRepository.selectPostsBySubreaditId(Integer.parseInt(subreadit_id));
    }

    @GetMapping("/posts/{post_id}")
    public Post getPostById(@PathVariable String post_id) {
        return postRepository.findById(Integer.parseInt(post_id));
    }

    @PatchMapping("/posts/{post_id}")
    public Post updatePost(@PathVariable String post_id, @RequestBody Post post) {
        return postRepository.updatePost(post.getTitle(), post.getContent(), post.getLink_url(), Integer.parseInt(post_id));
    }

    @DeleteMapping("/posts/{post_id}")
    public Post deletePost(@PathVariable String post_id) {
        Post post = postRepository.findById(Long.parseLong(post_id));
        postRepository.deleteById(Long.parseLong(post_id));
        return post;
    }

//    @PostMapping("/posts")
//    public Post createPost(@RequestBody Post post) {
//        System.out.println(post);
//        return postRepository.save(post);
//    }

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
