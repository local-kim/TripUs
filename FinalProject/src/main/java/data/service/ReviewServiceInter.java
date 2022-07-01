package data.service;

import java.util.List;

import data.dto.ReviewDto;

public interface ReviewServiceInter {
	
	public void insertReview(ReviewDto dto);
	public int getTotalCount();
	public List<ReviewDto> getPagingList(int start,int perpage);
	public List<ReviewDto> getAllDatas(String place_id);
	public double getAvgStars(String place_id);
	public ReviewDto getData(int num);
}
