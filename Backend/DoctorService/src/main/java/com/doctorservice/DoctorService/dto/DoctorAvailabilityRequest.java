package com.doctorservice.DoctorService.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Data
@Setter
@Getter
public class DoctorAvailabilityRequest {
    @NotEmpty
    private List<DayAvailabilityRequest> days;
}
