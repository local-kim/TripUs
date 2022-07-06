package data.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import data.dto.MemberSecurityDto;
import data.mapper.MemberSecurityMapper;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
   private final MemberSecurityMapper mapper;

   public CustomUserDetailsService(MemberSecurityMapper mapper) {
      this.mapper = mapper;
   }

   @Override
   @Transactional
   public UserDetails loadUserByUsername(final String id) {
      return mapper.findOneWithAuthoritiesById(id)
         .map(user -> createUser(id, user))
         .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
   }

   private org.springframework.security.core.userdetails.User createUser(String username, MemberSecurityDto user) {
      if (!user.isActivated()) {
         throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
      }
      List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
              .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
              .collect(Collectors.toList());
      return new org.springframework.security.core.userdetails.User(user.getUsername(),
              user.getPassword(),
              grantedAuthorities);
   }
}
