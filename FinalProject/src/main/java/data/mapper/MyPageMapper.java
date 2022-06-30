package data.mapper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.fasterxml.jackson.annotation.JsonFormat;

import data.dto.MemberDto;



@Mapper
public interface MyPageMapper {
	
	// user 로그인 정보수정
	public MemberDto getMemberData(MemberDto dto);

	// 회원 탈퇴
	public void userDelete(int num);
	
	//userIdx얻기
	public int getUserId(String id);
	
}
