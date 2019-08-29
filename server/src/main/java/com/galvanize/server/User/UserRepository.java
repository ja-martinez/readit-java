package com.galvanize.server.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository <User, Long> {

    User findByUsernameAndPassword(String username, String password);

    User findById(long id);
}
