package data.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import data.dto.MemberDto;
import data.service.MemberService;


@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/insert")
	public void insert(@RequestBody MemberDto dto
//			@RequestParam String year,
//			@RequestParam String month,
//			@RequestParam String day
//			@RequestParam String address1,
//			@RequestParam String address2,
//			@RequestParam String zonecode		
			
			) {
//		System.out.println(dto);
//		System.out.println(year+',' +month+','+ day);
//		String birthday = year+month+day;
//		dto.setBirthday(birthday);
//		System.out.println(birthday);
		memberService.insertMember(dto);
		
	}
	@GetMapping("/idcheck")
	public int idcheck(@RequestParam String id) {
		return memberService.idcheck(id);
	}
	@GetMapping("/emailcheck")
	public int emailcheck(@RequestParam String email) {
		return memberService.emailcheck(email);
	}
//	@PostMapping("/login")
//	public int login(@RequestBody MemberDto dto) {
//		return memberService.loginCheck(dto.getId(), dto.getPassword());
//	}
	@GetMapping("/getname")
	public String getname(@RequestParam String id) {
		return memberService.getName(id);
	}
	@DeleteMapping("delete")
	public void deleteMember(@RequestParam int num) {
		memberService.deleteMember(num);
	}
	// 로그인 처리
		@PostMapping("/process")
		public boolean process(
				@RequestParam String id,
				@RequestParam String password,
				@RequestParam(required = false) String saveId,
				HttpSession session
				) {
//			password = Util.encode(password);
			
			if(memberService.login(id, password)) {
				System.out.println("로그인 성공");
				List<Map<String, Object>> map = memberService.getLoginInfo(id);
				
				session.setMaxInactiveInterval(60 * 60 * 24);	// 24h
				session.setAttribute("loggedIn", true);
				session.setAttribute("loginId", id);
				session.setAttribute("loginNum", map.get(0).get("num"));
				session.setAttribute("loginName", map.get(0).get("name"));
				session.setAttribute("loginAdmin", map.get(0).get("type"));
				session.setAttribute("saveId", (saveId == null ? "false" : "true"));
				
				return true;
			}
			else {
				System.out.println("로그인 실패");
				return false;
			}
		}
		@GetMapping("/logout")
		public void logout(
				HttpSession session
				) {
			session.removeAttribute("loggedIn");
			session.invalidate();
		}
	//   이메일 (ID 중복확인 및 이메일 인증번호 보내기)
		   @PostMapping("/duplicateCheck")
		   public ResponseEntity<String> duplicateCheck(@RequestBody Map<String, String> map ) throws Exception {
		      String email = map.get("email");
		      Integer confirmCheck = memberService.emailcheck(email);
		      if(email == "") { //이메일 null 값이면  인증번호 생성 x
		         return ResponseEntity.badRequest().body("email empty");
		      } else if(confirmCheck == 1) { // 이메일이 중복이면  인증번호 생성 x
		         return ResponseEntity.ok("cofirm");
		      } else { // 이메일이 신규이면 해당 이메일로 인증번호 생성 및 전달
		         Boolean authenticationCreate = memberService.authenticationCreate(map);
		         return ResponseEntity.ok("pass");   
		      }
		   }
		   
		   //인증번호 확인하기 
		   @PostMapping("/emailConfirm")
		   public ResponseEntity<String> emailConfirm(@RequestBody Map<String, String> map ) throws Exception {
		      System.out.println(map);
		      
		      String email = map.get("email");
		      System.out.println(email);
		      String authentication_key = map.get("authentication_key");
		      System.out.println(authentication_key);
		      
		      String keyConfrim = memberService.authenticationKeySelect(email); //해당 이메일 인증번호 확인
		      System.out.println(keyConfrim);
		      
		      
		      if(authentication_key.equals(keyConfrim)) { // 해당 인증번호 이메일 일치하면 enabled true
		         memberService.authenticationSucces(email);
		         return ResponseEntity.ok("true");
		      } else {
		         return ResponseEntity.ok("false");
		      }
		   }

}
