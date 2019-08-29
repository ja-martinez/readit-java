package com.galvanize.server.User.Auth;

import lombok.Data;

@Data
public class NotAuthd implements Auth {
    private boolean authenticated = false;
}
