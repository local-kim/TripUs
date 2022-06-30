package data.service;

import data.dto.MemberDto;

public interface MemberServiceInter {
	public void insertMember(MemberDto dto);
	public String getName(String id);
	public int loginCheck(String id,String pass);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);

}
