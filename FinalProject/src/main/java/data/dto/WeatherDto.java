package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("/weather")
@Data
public class WeatherDto {
	private int num;
	private String placenum;
	private String placename;
}
