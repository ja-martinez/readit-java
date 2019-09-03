package com.galvanize.server.Post;

import lombok.Data;

import java.math.BigInteger;

@Data
public class PostResponse {

    private BigInteger id;
    private String title;
    private String content;
    private String link_url;
    private int votes;
    private String username;
    private String subreadit;

    public PostResponse(Object id, Object title, Object content, Object link_url, Object votes, Object username, Object name) {
        this.id = (BigInteger) id;
        this.title = (String) title;
        this.content = (String) content;
        this.link_url = (String) link_url;
        this.votes = (int) votes;
        this.username = (String) username;
        this.subreadit = (String) name;
    }
}