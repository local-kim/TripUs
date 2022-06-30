package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("plan")
@Data
public class PlanDto {
	private int num;
	private int trip_num;
	private int day;
	private int order;
	private int place_id; 
	private int id;
	private int city_num;
	private String type;
	private String name;
	private String category;
}
