package com.mzdyrski.itjobboard.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "employees_cvs")
@NoArgsConstructor
public class EmployeesCv {
    @Id
    private String id;
    private String employeeId;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private Binary file;
}
