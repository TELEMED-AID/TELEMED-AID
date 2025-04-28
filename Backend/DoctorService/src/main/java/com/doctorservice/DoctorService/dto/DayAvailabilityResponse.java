package com.doctorservice.DoctorService.dto;

import com.doctorservice.DoctorService.entity.DoctorAvailableDay;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class DayAvailabilityResponse {
    private DayOfWeek day;
    private List<TimeSlotResponse> timeSlots = new ArrayList<>();
}
