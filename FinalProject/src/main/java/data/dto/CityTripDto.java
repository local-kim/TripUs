package data.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("citytrip")
@Data
public class CityTripDto {
	private int cityNum;
	private String cityName;
	private String eng_name;
	private String country;
	private String image;
	
	
	private int memberNum;
	private int tripNum;
	private String tripName;
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="Asia/Seoul")
	private Date startDate;
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="Asia/Seoul")
	private Date endDate;
	private int days;
	
	
}
