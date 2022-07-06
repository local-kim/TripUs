package data.controller;

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

import data.dto.ReviewDto;
import data.service.ReviewService;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	//@Autowired
	//private ReviewMapper reviewMapper;
//	@Autowired
//	private MemerService memberService;
	
	
	//리뷰사진없이 리뷰작성할때
	@PostMapping("/insert")
	public void insert(@RequestBody ReviewDto dto) {
		int member_num=2;
		dto.setMember_num(member_num);
		System.out.println(dto);
		reviewService.insertReview(dto);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody ReviewDto dto) {
		System.out.println("update");
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
		return reviewService.getData(num);
	}
	@GetMapping("/avgstars")
	public double getAvgStars(@RequestParam String place_id) {
		System.out.println("stars");
		return reviewService.getAvgStars(place_id);
	}
}
