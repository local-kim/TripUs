package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import data.dto.MemberDto;
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
	
	
	

}
	