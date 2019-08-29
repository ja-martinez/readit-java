package com.galvanize.server.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface PostRepository extends JpaRepository <Post, Long> {

    @Query(value = "SELECT * FROM posts", nativeQuery = true)
    ArrayList<Post> selectAllPosts();

    @Query(value = "SELECT * FROM posts WHERE user_id = ?1", nativeQuery = true)
    ArrayList<Post> selectPostsByUserId(int user_id);

    @Query(value = "SELECT * FROM posts WHERE subreadit_id = ?1", nativeQuery = true)
    ArrayList<Post> selectPostsBySubreaditId(int subreadit_id);

    Post findById(long id);

    @Query(value = "UPDATE posts SET title = ?1, content = ?2, link_url= ?3 WHERE id = ?4 RETURNING *", nativeQuery = true)
    Post updatePost(String title, String content, String link_url, int id);

    @Query(value = "UPDATE posts SET votes = votes + 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Post upvoteById(long id);

    @Query(value = "UPDATE posts SET votes = votes - 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Post downvoteById(long id);


}
