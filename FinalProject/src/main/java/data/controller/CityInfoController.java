package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.CityDto;
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
			@RequestParam int member_num,
			@RequestParam int city_num
			) {
		return ciservice.getTripData(member_num,city_num);
	}
	
	// 현지씌 작품 돈터치!!!
	// 도시 목록 페이지
	@GetMapping("/list")
	public List<CityDto> getCityList(){
		return ciservice.getCityList();
	}
}
