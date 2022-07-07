package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import data.dto.MemberSecurityDto;
import data.mapper.MemberSecurityMapper;

@Service
//@Component("userDetailsService")
public class CustomMemberDetailsService implements UserDetailsService {
	@Autowired
	private MemberSecurityMapper mapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Transactional
    public void joinUser(MemberSecurityDto member, String role){
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setAccountNonExpired(true);
        member.setAccountNonLocked(true);
        member.setCredentialsNonExpired(true);
        member.setEnabled(true);
        mapper.saveMember(member);
        Map<String, String> map = new HashMap<>();
        map.put("id", member.getId());
        map.put("authority_name", role);
    }
	
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		MemberSecurityDto member = mapper.getMemberAccount(id);
		member.setAuthorities(member.getAuthorities());
		
//        if (member == null){
//            throw new UsernameNotFoundException("User not authorized.");
//        }
        
        return member;
	}
//   private final MemberSecurityMapper mapper;
//
//   public CustomUserDetailsService(MemberSecurityMapper mapper) {
//      this.mapper = mapper;
//   }
//
//   @Override
//   @Transactional
//   public UserDetails loadUserByUsername(final String id) {
//      return mapper.findOneWithAuthoritiesById(id)
//         .map(user -> createUser(id, user))
//         .orElseThrow(() -> new UsernameNotFoundException(id + " -> 데이터베이스에서 찾을 수 없습니다."));
//   }
//
//   private org.springframework.security.core.userdetails.User createUser(String username, MemberSecurityDto user) {
//      if (!user.isActivated()) {
//         throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
//      }
//      List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
//              .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
//              .collect(Collectors.toList());
//      return new org.springframework.security.core.userdetails.User(user.getUsername(),
//              user.getPassword(),
//              grantedAuthorities);
//   }
	
	
}
