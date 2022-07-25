package data.dto;

import java.sql.Date;

import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Alias("AuthenticationDto")
public class AuthenticationDto {
	@NotNull
	private Integer authentication_id;
	@NotNull
	private String authentication_email;
	private String authentication_key;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date create_date;
	private boolean authentication_enabled;
	
}
