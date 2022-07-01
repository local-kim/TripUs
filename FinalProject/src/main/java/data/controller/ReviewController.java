package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	
//	@PostMapping("/insert")
//	public void insert(@RequestBody ReviewDto dto) {
//		System.out.println(dto);
//		reviewService.insertReview(dto);
//	}
	
	@GetMapping("/allreview")
	public List<ReviewDto> getAllList(@RequestParam String place_id){
		System.out.println("ok");
		return reviewService.getAllDatas(place_id);
	}
	
	@GetMapping("/avgstars")
	public double getAvgStars(@RequestParam String place_id) {
		System.out.println("stars");
		return reviewService.getAvgStars(place_id);
	}
}
