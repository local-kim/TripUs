package data.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.MemberDto;


@Mapper
public interface MemberMapper {
	public void insertMember(MemberDto dto);
	public String getName(String id);
	public int logincheck(Map<String, String> map);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);
	

}
