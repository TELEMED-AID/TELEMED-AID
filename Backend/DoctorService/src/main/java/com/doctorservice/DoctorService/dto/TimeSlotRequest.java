package com.doctorservice.DoctorService.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@Setter
@Getter
public class TimeSlotRequest {
    @NotNull
    private LocalTime startTime;

    @NotNull
    @Max(6)
    private Byte duration;

    // Getters and setters
}
