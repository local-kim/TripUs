package data.controller;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import data.dto.MemberDto;
import data.mapper.MyPageMapper;
import data.service.MypageService;
import data.service.MypageServiceInter;


@RestController
@CrossOrigin
@RequestMapping("/mypage") 
public class MypageController {


	@Autowired
	private MypageService service;
	
	@Autowired
	MyPageMapper mapper;
	
	// 회원 탈퇴
	@GetMapping("/delete")
	public void delete(
//			@RequestParam(required=false) int num,
//			@RequestParam(required=false) String Id,
			HttpSession session,
			HttpServletRequest request
			) {
		int num = 4;
	
		
	
//		String id = (String)session.getAttribute("id");
//	
//		num = mapper.getUserId(id);

		service.userDelete(num);	
		

		
		//return "redirect:../";
		
	}
	


		@GetMapping("/profile")
		public MemberDto profile()
		{
			//dto 얻기 
			int num = 3;
		
			return service.getData(num);
			
		}
		
		@GetMapping("/getprofile")
		public MemberDto mypage()
		{
			int num=3;
			
			return service.getData(num);
		}
	
}

