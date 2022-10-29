package com.mzdyrski.itjobboard.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class User {
    @Id
    private String id;

    @Indexed(unique=true)
    private String email;

    private String password;
    private String role;
    private String[] authorities;
    private Date joinedDate;
    private boolean isActive;
    private boolean isNotLocked;

    public User(String email, String password, String role, String[] authorities, Date joinedDate, boolean isActive, boolean isNotLocked) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
        this.joinedDate = joinedDate;
        this.isActive = isActive;
        this.isNotLocked = isNotLocked;
    }
}
