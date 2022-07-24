package data.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.CityDto;
import data.dto.ReviewDto;
import data.dto.TripDto;
import data.dto.WeatherDto;
import data.service.CityInfoService;

@RestController
@RequestMapping("/city")
@CrossOrigin (origins = "*" , exposedHeaders = "**")
public class CityInfoController {

	@Autowired
	private CityInfoService ciservice;
	
	@GetMapping("/citydata")
	public CityDto getData(@RequestParam int num) {
		return ciservice.getData(num);
	}
	
	// city랑 trip이랑 join 써본거
//	@GetMapping("/citydata")
//	public List<CityDto> getData(@RequestParam int num) {
//		return ciservice.getData(num);
//	}
	
//	@GetMapping("/placename")
//	public void getName(@RequestParam String name) {
//		ciservice.getName(name);
//	}
	
	@GetMapping("/tripdata")
	public List<TripDto> getTripData(
			@RequestParam int loginNum,
			@RequestParam int city_num
			) {
		return ciservice.getTripData(loginNum,city_num);
	}
	
	// 장소 좋아요
	@GetMapping("/like")
	public int getLike(@RequestParam String place_id,@RequestParam int loginNum) {
		System.out.println("mylike");
		System.out.println(ciservice.getLike(place_id,loginNum));
		return ciservice.getLike(place_id,loginNum);
	}
	@PostMapping("/insertlike")
		public void insertLike(@RequestBody HashMap<String, Object> request){
		System.out.println(request);
		int place_id=Integer.parseInt(String.valueOf(request.get("place_id")));
		int loginNum=(Integer)request.get("loginNum");
		request.get("check");
		ciservice.insertLike(place_id,loginNum);
	}
	@DeleteMapping("/deletelike")
	public void deleteLike(@RequestParam String place_id,@RequestParam int loginNum) {
		ciservice.deleteLike(place_id, loginNum);
	}
	
	// 현지씌 작품 돈터치!!!
	// 도시 목록 페이지
	@GetMapping("/list")
	public List<CityDto> getCityList(){
		return ciservice.getCityList();
	}
}
