package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("city")
@Data
public class CityDto {
	private int num;
	private String name;
	private String eng_name;
	private String country;
	private String image;
	private int area_code;
	private int sigungu_code;
	private String x;
	private String y;
}
