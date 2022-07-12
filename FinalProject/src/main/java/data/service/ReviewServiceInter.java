package data.service;

import java.util.List;

import data.dto.ReviewDto;

public interface ReviewServiceInter {
	
	public int insertReview(ReviewDto dto);
	public void deleteReview(int num);
	public void deletePhoto(int num);
	public int getTotalCount();
	public List<ReviewDto> getPagingList(int start,int perpage);
	public List<ReviewDto> getAllDatas(String place_id);
	public double getAvgStars(String place_id);
	public int getSumLikes(String place_id);
	public int getLike(String place_id);
	public ReviewDto getData(int num);
	public void updateReview(ReviewDto dto);
	public void insertPhoto(ReviewDto dto);
	public void updatePhoto(ReviewDto dto);
}
