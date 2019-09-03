package com.galvanize.server.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface PostRepository extends JpaRepository <Post, Long> {

    @Query(value = "SELECT posts.id, posts.title, posts.content, posts.link_url, posts.votes, users.username, subreadits.name FROM posts JOIN users ON posts.user_id = users.id JOIN subreadits ON posts.subreadit_id = subreadits.id", nativeQuery = true)
    List<Object[]> selectAllPosts();


    @Query(value = "SELECT posts.id, posts.title, posts.content, posts.link_url, posts.votes, users.username, subreadits.name FROM posts JOIN users ON posts.user_id = users.id JOIN subreadits ON posts.subreadit_id = subreadits.id WHERE posts.user_id = ?1", nativeQuery = true)
    ArrayList<Object[]> selectPostsByUserId(int user_id);

    @Query(value = "SELECT posts.id, posts.title, posts.content, posts.link_url, posts.votes, users.username, subreadits.name FROM posts JOIN users ON posts.user_id = users.id JOIN subreadits ON posts.subreadit_id = subreadits.id WHERE posts.subreadit_id = ?1", nativeQuery = true)
    ArrayList<Object[]> selectPostsBySubreaditId(int subreadit_id);

    @Query(value = "SELECT posts.id, posts.title, posts.content, posts.link_url, posts.votes, users.username, subreadits.name FROM posts JOIN users ON posts.user_id = users.id JOIN subreadits ON posts.subreadit_id = subreadits.id WHERE posts.id = ?1", nativeQuery = true)
    Object[] selectPostById(int id);


    @Query(value = "UPDATE posts SET title = ?1, content = ?2, link_url= ?3 WHERE id = ?4 RETURNING *", nativeQuery = true)
    Post updatePost(String title, String content, String link_url, int id);

    @Query(value = "UPDATE posts SET votes = votes + 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Post upvoteById(long id);

    @Query(value = "UPDATE posts SET votes = votes - 1 WHERE id = ?1 RETURNING *", nativeQuery = true)
    Post downvoteById(long id);


}
