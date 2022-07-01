package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("itinerary")
public class ItineraryDto {
	private int trip_num;
	private int day;
	private int order;
	private String place_id;
}
