package data.service;

import java.util.List;


import data.dto.MemberDto;
import data.dto.ProfileDto;
import data.dto.TripDto;

public interface MypageServiceInter {
	
	public void userDelete(int num);
	
	public MemberDto getData(int num);
	
	public int userTrip(int member_num);
	
	public List<TripDto> getPagingList(int start, int perpage);
	
	public List<TripDto> getAllDates();
	
	public int userReview(int member_num);
	
	//로딩시 사진 가져오기
	public String findPhoto(int member_num); //(파라미터임) public뒤에있는게 리졀트임 ㅇㅇ 
	
	//마이페이지 업데이트
	public void updateProfile(ProfileDto dto);
	
	//마이페이지 정보 업데이트
	public void updateProfile2(MemberDto dto);
	
	
	
	
}
