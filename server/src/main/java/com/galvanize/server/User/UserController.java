package com.galvanize.server.User;

import com.galvanize.server.User.Auth.Auth;
import com.galvanize.server.User.Auth.Authd;
import com.galvanize.server.User.Auth.NotAuthd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/v1")
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Auth userLogin(@RequestBody HashMap<String, String> creds) {
        User user = userRepository.findByUsernameAndPassword(creds.get("username"), creds.get("password"));
        if (user != null) {
            return new Authd(user);
        } else {
            return new NotAuthd();
        }
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
