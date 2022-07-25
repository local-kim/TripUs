package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityTripDto;
import data.dto.MemberDto;
import data.dto.ReviewPlaceDto;
import data.mapper.UserPageMapper;

@Service
public class UserPageService {
	
	@Autowired
	private UserPageMapper mapper;
	
	public MemberDto getUserInfo(int memberNum) {
		return mapper.getUserInfo(memberNum);
	}
	
//	public int getTripCount(int memberNum) {
//		return mapper.getTripCount(memberNum);
//	}
//	
//	public int getReviewCount(int memberNum) {
//		return mapper.getReviewCount(memberNum);
//	}
	
	public List<CityTripDto> getTripList(int memberNum) {
		return mapper.getTripList(memberNum);
	}
	
	public List<ReviewPlaceDto> getReviewList(int memberNum){
		return mapper.getReviewList(memberNum);
	}
}
