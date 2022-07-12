package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("planMap")
@Data
public class PlanMapDto {
	private int day;
	private int order;
	private double mapx;
	private double mapy;
}
