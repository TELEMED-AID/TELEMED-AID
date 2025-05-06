package telemedaid.authentication_service.DTOs;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class CreatePatientRequest {
    private Long id;
    private String nationalId;  // Must match exactly
    private String name;
    private String countryName;
    private String countryId;
    private String gender;
    private String phone;
    private String birthDate; // Format: "yyyy-MM-dd"
}