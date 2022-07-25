package data.service;

import java.util.List;
import java.util.Map;

import data.dto.MemberDto;

public interface MemberServiceInter {
	public void insertMember(MemberDto dto);
	public String getName(String id);
//	public int loginCheck(String id,String pass);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);
	public boolean login(String id, String password);
	public List<Map<String, Object>> getLoginInfo(String id);
	public int checkKakaoMember(String id);
	// 인증번호 서비스
	public Boolean authenticationCreate(Map<String,String> map) throws Exception;
	// 인증번호 확인
	public String authenticationKeySelect(String email);
	//  인증 완료
	public void authenticationSucces(String email);

}
