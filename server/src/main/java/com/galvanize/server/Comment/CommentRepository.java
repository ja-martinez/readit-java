package com.galvanize.server.Comment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository <Comment, Long> {
    @Query(value = "SELECT c.id, c.content, c.votes, u.username, r.parent_id FROM comments c LEFT JOIN comment_relationships r ON c.id = r.child_id LEFT JOIN users u ON c.user_id = u.id WHERE c.post_id = ?1", nativeQuery = true)
    List<Object[]> getCommentsByPostId(long postId);

    @Query(value = "SELECT c.id, c.content, c.votes, u.username, r.parent_id FROM comments c LEFT JOIN comment_relationships r ON c.id = r.child_id LEFT JOIN users u ON c.user_id = u.id WHERE c.user_id = ?1", nativeQuery = true)
    List<Object[]> getCommentsByUserId(long userId);

    @Query(value = "UPDATE comments SET votes = votes + 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Comment upvoteCommentById(long commentId);

    @Query(value = "UPDATE comments SET votes = votes - 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Comment downvoteCommentById(long commentId);

    Comment findById(long id);
}
