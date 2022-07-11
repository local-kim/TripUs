package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.LoginDto;
import data.dto.MemberSecurityDto;
import data.dto.TokenDto;
import data.jwt.JwtFilter;
import data.jwt.TokenProvider;
import data.service.CustomMemberDetailsService;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin (origins = "*" , exposedHeaders = "**")
public class AuthController {
	
	@Autowired
	private CustomMemberDetailsService service;
	
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    // 로그인시 권한 검증
    @PostMapping("/login")
    public ResponseEntity<MemberSecurityDto> login(@RequestBody LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        
        MemberSecurityDto member = (MemberSecurityDto)service.loadUserByUsername(loginDto.getId());
        member.setToken(jwt);

//        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
        return new ResponseEntity<>(member, httpHeaders, HttpStatus.OK);
    }
    
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberSecurityDto member){
    	service.join(member, "ROLE_USER");	// 일반회원 가입시 ROLE_USER로 권한 설정
    	return ResponseEntity.ok("Sign up success");
    }
    
//    @PostMapping("/login")
//    public void login(@RequestBody MemberSecurityDto member) {
//    	
//    }
}