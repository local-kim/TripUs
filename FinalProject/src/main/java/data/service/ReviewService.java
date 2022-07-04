package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.ReviewDto;
import data.mapper.ReviewMapper;

@Service
public class ReviewService implements ReviewServiceInter {
	
	@Autowired
	
	private ReviewMapper reviewMapper;
	@Override
	public void insertReview(ReviewDto dto) {
		// TODO Auto-generated method stub
		reviewMapper.insertReview(dto);

	}

	@Override
	public int getTotalCount() {
		// TODO Auto-generated method stub
		return reviewMapper.getTotalCount();
	}

	@Override
	public List<ReviewDto> getPagingList(int start, int perpage) {
		// TODO Auto-generated method stub
		Map<String, Integer> map = new HashMap<>();
		map.put("start", start);
		map.put("perpage", perpage);
		return reviewMapper.getPagingList(map);
	}

	@Override
	public List<ReviewDto> getAllDatas(String place_id) {
		// TODO Auto-generated method stub
		return reviewMapper.getAllDatas(place_id);
	}

	@Override
	public ReviewDto getData(int num) {
		// TODO Auto-generated method stub
		return reviewMapper.getData(num);
	}
	
	@Override
	public double getAvgStars(String place_id) {
		return reviewMapper.getAvgStars(place_id);
	}

}
