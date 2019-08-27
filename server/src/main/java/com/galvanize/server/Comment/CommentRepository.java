package com.galvanize.server.Comment;

import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository <Comment, Long> {
}
