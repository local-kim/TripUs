package data.controller;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import data.dto.MemberDto;
import data.dto.ProfileDto;

import data.dto.TripDto;
import data.mapper.MyPageMapper;
import data.service.MypageService;
import data.service.MypageServiceInter;
import util.FileUtil;


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
		public Map<String, Object> profile() //int num 넣기
		{
			//dto 얻기 
			int member_num = 3;
			
			String photo = service.findPhoto(member_num);
			
			Map<String,Object> map = new HashMap<>();
			
			map.put("photo",photo);
		
			map.put("member", service.getData(member_num));
			
			return map;
			
			
		}
		
//		@GetMapping("/photo")
//		public String photo()
//		
//		{
//			int member_num =3;
//			
//			return service.findPhoto(member_num);
//		}
		

		
		
		@GetMapping("/pagelist") //@RequestParam(defaultValue = "1") int currentPage
		public Map<String, Object> getPageList(){
				
			int num=3;
			
			int totalCount;	// 총 개수
			int totalCount2;
//			int perPage = 3;		// 페이지 당 글 수
//			int perBlock = 5;	// 블럭 당 페이지 수
//			int totalPage;	// 총 페이지 수
//			int startNum;	// 한 페이지에서 보여질 시작글 번호
//			int startPage;	// 한 블럭에서 보여질 시작 페이지 번호
//			int endPage;		// 한 블럭에서 보여질 끝 페이지 번호
//			int no;	// 각 페이지 당 보여질 시작 번호
//			
			// 총 글의 개수를 구한다
			totalCount = service.userTrip(num);
		
			totalCount2 = service.userReview(num);
//			// 총 페이지 수를 구한다
//			totalPage = totalCount / perPage + (totalCount % perPage == 0 ? 0 : 1);	// 딱 떨어지지 않으면 한 페이지를 더함
//			// totalPage = (int)Math.ceil((double)totalCount / perPage);	// 무조건 올림
//			
//			// 각 블럭의 시작 페이지 (한 블럭 당 5개일 경우 예시)
//			// 1, 6, 11,,, (currentPage가 1~5 일때는 1, 6~10일때는 6)
//			startPage =  (currentPage - 1) / perBlock * perBlock + 1;
//			// 5, 10, 15,,,
//			endPage = startPage + perBlock - 1;
//			
//			// 문제점 (마지막 블럭은 마지막 페이지까지만 나와야함)
//			if(endPage > totalPage) {
//				endPage = totalPage;
//			}
//			
//			// 각 페이지에서 보여질 글의 시작 번호(mysql은 0부터)
//			// 한 페이지 당 3개일 경우 1페이지: 0, 2페이지: 3, 3페이지: 6 ,,,
//			startNum = (currentPage - 1) * perPage;	// oracle은 +1 해줌
//			
//			// 각 페이지 당 보여질 시작번호
//			no = totalCount - (currentPage - 1) * perPage;
//			
//			// 데이터 가져오기
//			List<TripDto> list = service.getPagingList(startNum, perPage);
//			
//			// 출력할 페이지 번호
//			Vector<Integer> parr = new Vector<>();
//			for(int pp = startPage; pp <= endPage; pp++) {
//				parr.add(pp);
//			}
//			
			// 리턴할 Map에 필요한 변수들 넣기
			Map<String, Object> map = new HashMap<>();
//			map.put("list", list);
//			map.put("parr", parr);
			map.put("totalCount", totalCount);
			map.put("totalCount2", totalCount2);
//			map.put("totalPage", totalPage);
//			map.put("startPage", startPage);
//			map.put("endPage", endPage);
//			map.put("no", no);
			
			return map;
		}
		
		
		String  photoName; // 리엑트에서 업로드한 이미지명(변경된 이미지명일수도..)

		//리엑트에서 이미지 업로드시 save폴더에 저장후 이미지명 반환
		@PostMapping("/upload")
		public String fileUpload(@RequestParam MultipartFile uploadFile,HttpServletRequest request, @RequestParam(defaultValue = "3") int num) //requestparam이란 프론트에 정보를 spring으로 받아올땨 팔요하다.
		{
			//파일명
			String fileName=uploadFile.getOriginalFilename();
			
			//업로드할 폴더 위치(절대 경로임 mvc2 패턴에서) 
			String path=request.getServletContext().getRealPath("/save");
			
			//직전에 업로드한 이미지 삭제하기
			File file=new File(path+"/"+photoName);
			//만약 존재할경우 삭제
			if(file.exists())
				file.delete();
			
			//파일명 변경
			FileUtil fileUtil=new FileUtil();
			photoName=fileUtil.changeFileName(fileName);
			System.out.println("fileName="+fileName+"=>"+photoName);
			
			//save폴더에 업로드
			
			try {
				uploadFile.transferTo(new File(path+"/"+photoName));
			}catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
			return photoName;
		}	
		
		
		@PostMapping("/update")
		public void updateProfile(@RequestBody ProfileDto dto) 
		{
			//업로드한 사진명
			dto.setFile_name(photoName);
			
			dto.setMember_num(3);
			
			service.updateProfile(dto);
			photoName=null;
		}
		
	
		
		
//		@GetMapping("/list")
//		public List<ShopDto> list()
//		{
//			return shopService.getShopDatas();
//		}
//		

//		
//		
//		@DeleteMapping("/delete")
//		public void delete(@RequestParam int num,HttpServletRequest request)
//		{
//			//save경로 구하기 
//			System.out.println(num);
//			
//			String path=request.getServletContext().getRealPath("/save");
//			
//			//num에 해당하는 photo얻기
//			
//			String photo=shopService.getData(num).getPhoto();
//			
//			
//			
//			//직전에 업로드한 이미지 삭제하기
//			File file=new File(path+"/"+photo);
//			//만약 존재할경우 삭제
//			if(file.exists()) {
//				
//				file.delete();
//
//			}
//				
//					
//		
//			//db delete
//			
//			shopService.deleteShop(num);
//			
//			
//		}
//		



	
}

