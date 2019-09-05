package com.galvanize.server.Comment;

import com.galvanize.server.Comment_relationship.CommentResponse;
import com.galvanize.server.Comment_relationship.Comment_relationship;
import com.galvanize.server.Comment_relationship.Comment_relationshipRepository;
import com.galvanize.server.Post.PostRepository;
import com.galvanize.server.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class CommentController {
    @Autowired
    private final CommentRepository commentRepository;
    private final Comment_relationshipRepository comment_relationshipRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentController(CommentRepository commentRepository, Comment_relationshipRepository comment_relationshipRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.comment_relationshipRepository = comment_relationshipRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/posts/{postId}/comments")
    public List getCommentsByPost(@PathVariable String postId) {
        List<Object[]> comments = commentRepository.getCommentsByPostId(Long.parseLong(postId));
        List response = comments.stream()
                .map(comment -> new CommentResponse(comment[0], comment[1], comment[2], comment[3], comment[4]))
                .collect(Collectors.toList());
        return response;
    }

    @GetMapping("/users/{userId}/comments")
    public List getCommentsByUser(@PathVariable String userId) {
        List<Object[]> comments = commentRepository.getCommentsByUserId(Long.parseLong(userId));
        List response = comments.stream()
                .map(comment -> new CommentResponse(comment[0], comment[1], comment[2], comment[3], comment[4]))
                .collect(Collectors.toList());
        return response;
    }

    @PatchMapping("/comments/{commentId}/upvote")
    public Comment upvoteComment(@PathVariable String commentId) {
        return commentRepository.upvoteCommentById(Long.parseLong(commentId));
    }

    @PatchMapping("/comments/{commentId}/downvote")
    public Comment downvoteComment(@PathVariable String commentId) {
        return commentRepository.downvoteCommentById(Long.parseLong(commentId));
    }

    @PostMapping("/comments")
    public Comment createRootComment(@RequestBody HashMap<String, String> info) {
        Comment comment = new Comment();
        comment.setContent(info.get("content"));
        comment.setUser(userRepository.findById(Long.parseLong(info.get("user_id"))));
        comment.setPost(postRepository.findById(Long.parseLong(info.get("post_id"))));
        return commentRepository.save(comment);
    }

    @PostMapping("/comments/{commentId}/comments")
    public Comment createSubComment(@RequestBody HashMap<String, String> info) {
        Comment comment = new Comment();
        comment.setContent(info.get("content"));
        comment.setUser(userRepository.findById(Long.parseLong(info.get("user_id"))));
        comment.setPost(postRepository.findById(Long.parseLong(info.get("post_id"))));
        Comment commentResponse = commentRepository.save(comment);

        Comment_relationship commentRelationship = new Comment_relationship();
        commentRelationship.setChild(commentResponse);
        commentRelationship.setParent(commentRepository.findById(Long.parseLong(info.get("parent_id"))));
        comment_relationshipRepository.save(commentRelationship);

        return commentResponse;


    }
}
