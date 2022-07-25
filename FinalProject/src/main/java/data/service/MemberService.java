package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.AuthenticationDto;
import data.dto.MemberDto;
import data.mapper.MemberMapper;


@Service
public class MemberService implements MemberServiceInter {
	@Autowired
	private MemberMapper memberMapper;
	@Autowired
	private EmailService emailService;

	@Override
	public void insertMember(MemberDto dto) {
		// TODO Auto-generated method stub
		memberMapper.insertMember(dto);

	}

	@Override
	public String getName(String id) {
		// TODO Auto-generated method stub
		return memberMapper.getName(id);
	}

	//	@Override
	//	public int loginCheck(String id, String password) {
	//		// TODO Auto-generated method stub
	//		Map<String, String> map=new HashMap<>();
	//		map.put("id", id);
	//		map.put("password", password);
	//		return memberMapper.logincheck(map);
	//	}

	@Override
	public void deleteMember(int num) {
		// TODO Auto-generated method stub
		memberMapper.deleteMember(num);

	}

	@Override
	public int idcheck(String id) {
		// TODO Auto-generated method stub
		return memberMapper.idcheck(id);
	}

	@Override
	public int emailcheck(String email) {
		// TODO Auto-generated method stub
		return memberMapper.emailcheck(email);
	}

	@Override
	public boolean login(String id, String password) {
		// TODO Auto-generated method stub
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("password", password);

		return memberMapper.login(map) == 1 ? true : false;
	}

	@Override
	public List<Map<String, Object>> getLoginInfo(String id) {
		// TODO Auto-generated method stub
		return memberMapper.getLoginInfo(id);
	}

	@Override
	public int checkKakaoMember(String id) {
		// TODO Auto-generated method stub
		return memberMapper.checkKakaoMember(id);
	}

	@Override
	public Boolean authenticationCreate(Map<String, String> map) throws Exception {
		String email = map.get("email");
		System.out.println(email);
		Integer authenticationCheck=memberMapper.authenticationSelect(email);


		if(authenticationCheck==1) {
			String authentication_key = emailService.sendSimpleMessage(email);
			AuthenticationDto authenticationDto = new AuthenticationDto();
			authenticationDto.setAuthentication_email(email);
			authenticationDto.setAuthentication_key(authentication_key);
			memberMapper.authenticationUpdate(authenticationDto);
			return true;
		}else {
			String authentication_key = emailService.sendSimpleMessage(email);
			AuthenticationDto authenticationDto = new AuthenticationDto();
			authenticationDto.setAuthentication_email(email);
			authenticationDto.setAuthentication_key(authentication_key);
			memberMapper.authenticationInsert(authenticationDto);
			return true;
		}
	}

	@Override
	public String authenticationKeySelect(String email) {

		return memberMapper.authenticationKeySelect(email);
	}

	@Override
	public void authenticationSucces(String email) {

		AuthenticationDto authenticationDto = new AuthenticationDto();
		authenticationDto.setAuthentication_email(email);
		authenticationDto.setAuthentication_enabled(true);
		memberMapper.authenticationEnabledUpdate(authenticationDto);

	}

}
