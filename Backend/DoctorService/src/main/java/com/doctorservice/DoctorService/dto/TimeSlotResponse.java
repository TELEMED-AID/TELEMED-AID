package com.doctorservice.DoctorService.dto;

import com.doctorservice.DoctorService.entity.TimeSlot;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
@Setter
@Getter
public class TimeSlotResponse {
    private LocalTime startTime;
    private Byte duration;
}
