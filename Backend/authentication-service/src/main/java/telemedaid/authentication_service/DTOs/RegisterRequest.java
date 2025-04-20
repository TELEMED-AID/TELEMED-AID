package telemedaid.authentication_service.DTOs;

import lombok.*;
import telemedaid.authentication_service.Entities.Role;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String nationalId;
    private String name;
    private String countryName;
    private String countryId;
    private String phone;
    private String password;
    private Date dateOfBirth;
    private String gender;
    private Role role;

}
