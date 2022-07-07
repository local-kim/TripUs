package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("review")
@Data
public class ReviewDto {
	private int num;
	private String place_id;
	private int member_num;
	private String name;
	private double stars;
	private String content;
	private String file_name;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp created_at;
}
