package data.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import data.dto.ReviewDto;
import data.service.ReviewService;
import util.FileUtil;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	String photoName; //리엑트에서 업로드한 이미지명
	//@Autowired
	//private ReviewMapper reviewMapper;
//	@Autowired
//	private MemerService memberService;
	
	@PostMapping("/upload")	//onchange에 넣는거...인데...
		public String fileUpload(@RequestParam MultipartFile uploadFile,
				HttpServletRequest request) {
		//파일명
		String fileName=uploadFile.getOriginalFilename();
		System.out.println("fileName="+fileName);
		//업로드할 폴더 위치
		String path=request.getServletContext().getRealPath("/review_photo");
		
		//직전에 업로드한 이미지 삭제하기
		File file =new File(path+"/"+photoName);
		//만약 존재할 경우 삭제
		if(file.exists())
			file.delete();
		
		//파일명 변경
		FileUtil fileUtil =new FileUtil();
		photoName=fileUtil.changeFileName(fileName);
		System.out.println("fileName="+fileName+"=>"+photoName);
		
		//save폴더에 업로드
		try {
				uploadFile.transferTo(new File(path+"/"+photoName));
			}catch(IllegalStateException | IOException e) {
				e.printStackTrace();
			}
				return photoName;
			}
	
	
	//리뷰사진없이 리뷰작성할때
	@PostMapping("/insert")
	public void insert(@RequestBody ReviewDto dto) {
		int member_num=2;
		dto.setMember_num(member_num);
		System.out.println(dto);
		int num=reviewService.insertReview(dto);
		
		if(photoName!=null) {
			dto.setNum(num);
			dto.setFile_name(photoName);
			reviewService.insertPhoto(dto);
		}
		
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ReviewDto dto) {
		System.out.println("update"+dto);
		//사진이 있을경우 이미지명 넣기
		//dto.setPhoto(photoName);
		reviewService.updateReview(dto);
	}
	
	@DeleteMapping("/delete")
	public void delete(@RequestParam int num,HttpServletRequest request) {
		//db delete
		reviewService.deleteReview(num);
		
	}
	@GetMapping("/allreview")
	public List<ReviewDto> getAllList(@RequestParam String place_id){
		System.out.println("ok");
		return reviewService.getAllDatas(place_id);
	}
	
	@GetMapping("/detail")
	public ReviewDto detail(@RequestParam int num) {
		System.out.println("detail");
		return reviewService.getData(num);
	}
	@GetMapping("/avgstars")
	public double getAvgStars(@RequestParam String place_id) {
		System.out.println("stars");
		return reviewService.getAvgStars(place_id);
	}
}
