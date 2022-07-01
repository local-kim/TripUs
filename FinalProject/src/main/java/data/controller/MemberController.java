package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public void insert(@RequestBody MemberDto dto) {
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
	@PostMapping("/login")
	public int login(@RequestBody MemberDto dto) {
		return memberService.loginCheck(dto.getId(), dto.getPassword());
	}
	@GetMapping("/getname")
	public String getname(@RequestParam String id) {
		return memberService.getName(id);
	}
	@DeleteMapping("delete")
	public void deleteMember(@RequestParam int num) {
		memberService.deleteMember(num);
	}

}
