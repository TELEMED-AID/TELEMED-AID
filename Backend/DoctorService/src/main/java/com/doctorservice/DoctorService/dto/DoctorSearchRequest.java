package com.doctorservice.DoctorService.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Setter
@Getter
public class DoctorSearchRequest {
    private String name;
    private String specialization;
    private String careerLevel;
    private DayOfWeek availabilityDay;
    private LocalTime startTime;
}