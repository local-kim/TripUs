package data.mapper;

import java.util.Optional;

import data.dto.MemberSecurityDto;

public interface MemberSecurityMapper {

	Optional<MemberSecurityDto> findOneWithAuthoritiesById(String id);
}
