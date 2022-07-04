package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import data.dto.MemberDto;
import data.dto.ProfileDto;
import data.dto.TripDto;
import data.mapper.MyPageMapper;

@Service
public class MypageService implements MypageServiceInter {
	
	@Autowired
	MyPageMapper mapper;
	

		
	@Override
	public void userDelete(int num) {
		// TODO Auto-generated method stub
		mapper.userDelete(num);
		
	}
	
	@Override
	public MemberDto getData(int num) {
		// TODO Auto-generated method stub
		return mapper.getData(num);
	}
	
	@Override
	public int userTrip(int member_num) {
		// TODO Auto-generated method stub
		return mapper.userTrip(member_num);
	}
	
	@Override
	public List<TripDto> getPagingList(int start, int perpage) {
		// TODO Auto-generated method stub
		Map<String, Integer> map=new HashMap<>();
		map.put("start", start);
		map.put("perpage",perpage);
		
		return mapper.getPagingList(map);
	}

	@Override
	public List<TripDto> getAllDates() {
		// TODO Auto-generated method stub
		return mapper.getAllDates();
	}
	
	@Override
	public int userReview(int member_num) {
		// TODO Auto-generated method stub
		return mapper.userReview(member_num);
	}
	
	@Override
	public String findPhoto(int member_num) {
		// TODO Auto-generated method stub
		return mapper.findPhoto(member_num);
	}
	@Override
	public void updateProfile(ProfileDto dto) {
		// TODO Auto-generated method stub
		mapper.updateProfile(dto);
		
	}
	
	@Override
	public void updateProfile2(MemberDto dto) {
		// TODO Auto-generated method stub
		mapper.updateProfile2(dto);
		
	}

}
	