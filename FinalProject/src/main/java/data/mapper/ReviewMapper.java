package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import data.dto.ReviewDto;

@Mapper
public interface ReviewMapper {
	public void insertReview(ReviewDto dto);
	public void deleteReview(int num);
	public int getTotalCount();
	public List<ReviewDto> getPagingList(Map<String,Integer> map);
	public List<ReviewDto> getAllDatas(String place_id);
	public double getAvgStars(String place_id);
	public ReviewDto getData(int num);
	public void updateReview(ReviewDto dto);
	
}
