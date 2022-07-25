package data.mapper;

import org.apache.ibatis.annotations.Mapper;

import data.dto.AuthenticationDto;

@Mapper
public interface UserMapper {

//  이메일 인증 사용자 확인
	public Integer authenticationSelect(String user_email);
//  이메일 인증번호 생성 
	public void authenticationInsert(AuthenticationDto authenticationDto);
// 인증번호 Enabled 키 확인
	public String authenticationEnabledSelect(String user_email);
// 인증번호 재전송
	public void authenticationUpdate(AuthenticationDto authenticationDto);
// 인증번호 확인
	public String authenticationKeySelect(String user_email);
// 	인증 Enabled 승인 및 초기화 
	public void authenticationEnabledUpdate(AuthenticationDto authenticationDto);

}
