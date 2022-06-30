package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("place")
public class PlaceDto {
	private String addr1;
	private String addr2;
	private String cat3;
	private String contentid;
	private String contenttypeid;
	private String firstimage;
//	private String firstimage2;
	private String mapx;
	private String mapy;
	private String title;
}
