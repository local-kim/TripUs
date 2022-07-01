package data.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("trip")
public class TripDto {
	private int num;
	private int member_num;
	private int city_num;
	private Date start_date;
	private Date end_date;
	private int days;
}
