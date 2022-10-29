package com.mzdyrski.itjobboard.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
public class Offer {
    private Long id;
    private Long employerId;
    private String title;
    private String location;
    private String remote;
    private String money;
    private String tags;
    private Date date;
    private String description;
}
