package data.service;

import java.util.List;

import data.dto.MemberDto;

public interface MypageServiceInter {
	
	public void userDelete(int num);
	
	public MemberDto getData(int num);
	
	
}
