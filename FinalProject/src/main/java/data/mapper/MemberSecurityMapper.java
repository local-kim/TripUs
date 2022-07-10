package data.mapper;

import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import data.dto.MemberSecurityDto;

@Mapper
public interface MemberSecurityMapper {

	Optional<MemberSecurityDto> findOneWithAuthoritiesById(String id);
	
	// 로그인
    MemberSecurityDto getMemberById(String id);
    
    // 권한 정보 얻기
    String getMemberAuthorityById(String id);

    // 회원가입
    void saveMember(MemberSecurityDto member);
    
    // 회원가입 시 권한 부여
    void saveAuthority(Map<String, String> map);
}
