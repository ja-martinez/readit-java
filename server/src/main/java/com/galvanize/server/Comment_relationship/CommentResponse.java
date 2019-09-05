package com.galvanize.server.Comment_relationship;

import lombok.Data;

import java.math.BigInteger;

@Data
public class CommentResponse {
    private BigInteger id;
    private String content;
    private int votes;
    private String username;
    private BigInteger parentId;

    public CommentResponse(Object id, Object content, Object votes, Object username, Object parentId) {
        this.id = (BigInteger) id;
        this.content = (String) content;
        this.votes = (int) votes;
        this.username = (String) username;
        this.parentId = (BigInteger) parentId;
    }
}
