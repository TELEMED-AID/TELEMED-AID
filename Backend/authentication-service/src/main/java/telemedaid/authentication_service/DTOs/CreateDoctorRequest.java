package telemedaid.authentication_service.DTOs;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class CreateDoctorRequest {
    private Long id;
    private String nationalId;
    private String name;
    private String phone;
    private Date birthDate;
    private String gender;
    private String countryName;
    private String countryId;
    private String careerLevelName;
    private String specializationName;
}
