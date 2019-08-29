package com.galvanize.server.User.Auth;

import com.galvanize.server.User.User;
import lombok.Data;

@Data
public class Authd implements Auth {
    private boolean authenticated = true;
    private User user;

    public Authd (User user) {
        this.user = user;
    }
}
