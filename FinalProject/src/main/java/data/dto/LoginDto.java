package data.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDto {
	private String id;
	private String password;
}
