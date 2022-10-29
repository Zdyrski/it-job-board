package com.mzdyrski.itjobboard.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class Employee extends User{

    private String firstName;
    private String lastName;
    private String cvLink;

    public Employee(String email, String password, String role, String[] authorities, Date joinedDate, boolean isActive, boolean isNotLocked, String firstName, String lastName, String cvLink) {
        super(email, password, role, authorities, joinedDate, isActive, isNotLocked);
        this.firstName = firstName;
        this.lastName = lastName;
        this.cvLink = cvLink;
    }
}
