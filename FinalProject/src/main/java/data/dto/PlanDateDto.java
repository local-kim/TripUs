package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("pdate")
@Data
public class PlanDateDto {
	private int num;
	private int days;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp start_date;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp end_date;
}
