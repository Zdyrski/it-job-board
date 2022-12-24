package com.mzdyrski.itjobboard.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class User {
    @Id
    private String id;

    @Email
    @Indexed(unique = true)
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String role;

    @NotNull
    private String[] authorities;

    private Date joinDate;

    private boolean active;

    private boolean locked;
}
