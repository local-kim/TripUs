package data.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("tripdata")
public class TripPlanDto {
	private int num;		// tripmnum
	private String name;	// tripname
	private int member_num;
	private int city_num;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="Asia/Seoul")
	private Date start_date;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="Asia/Seoul")
	private Date end_date;
	private int days;
//	private int citynum;
//	private String cityname;
//	private String eng_name;
//	private String country;
//	private String image;
//	private int area_code;
//	private int sigungu_code;	
}
