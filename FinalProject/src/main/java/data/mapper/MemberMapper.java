package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.AuthenticationDto;
import data.dto.MemberDto;


@Mapper
public interface MemberMapper {
	public void insertMember(MemberDto dto);
	public String getName(String id);
//	public int logincheck(Map<String, String> map);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);
	public int login(Map<String, String> map);
	public List<Map<String, Object>> getLoginInfo(String id);
	public int checkKakaoMember(String id);
//  이메일 인증 사용자 확인
	public Integer authenticationSelect(String email);
//  이메일 인증번호 생성 
	public void authenticationInsert(AuthenticationDto authenticationDto);
// 인증번호 Enabled 키 확인
	public String authenticationEnabledSelect(String email);
// 인증번호 재전송
	public void authenticationUpdate(AuthenticationDto authenticationDto);
// 인증번호 확인
	public String authenticationKeySelect(String email);
// 	인증 Enabled 승인 및 초기화 
	public void authenticationEnabledUpdate(AuthenticationDto authenticationDto);

}
