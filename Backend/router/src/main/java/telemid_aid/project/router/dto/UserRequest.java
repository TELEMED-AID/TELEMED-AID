package telemid_aid.project.router.dto;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
    private Long userId;
    private String name;
    private String countryName;
    private String countryId;
    private String phone;
    private Date dateOfBirth;
    private String gender;
    private String careerLevelName;
    private String specializationName;
    private String role;
}
