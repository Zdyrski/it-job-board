package com.mzdyrski.itjobboard.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
@NoArgsConstructor
public class Employee extends User{

    private String firstName;
    private String lastName;
}
