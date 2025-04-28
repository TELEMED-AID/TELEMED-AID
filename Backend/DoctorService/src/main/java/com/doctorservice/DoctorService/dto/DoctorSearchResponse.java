package com.doctorservice.DoctorService.dto;

import com.doctorservice.DoctorService.entity.Doctor;
import com.doctorservice.DoctorService.entity.DoctorAvailableDay;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class DoctorSearchResponse {
    private String name;
    private String specialization;
    private String careerLevel;
    private String phone;
    private List<DayAvailabilityResponse> availability = new ArrayList<>();
}

