package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("like")
@Data
public class LikeDto {
	private int loginNum;
	private String place_id;
	private int check;
}
