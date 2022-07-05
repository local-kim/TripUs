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
@CrossOrigin
@RequestMapping("/cityinfo")
public class CityInfoController {

	@Autowired
	private CityInfoService ciservice;
	
	@GetMapping("/weather")
	public WeatherDto getData(@RequestParam int num) {
		return ciservice.getData(num);
	}
	
	@GetMapping("/placename")
	public void getName(@RequestParam String name) {
		ciservice.getName(name);
	}
	
	@GetMapping("/trip")
	public TripDto getTripData(@RequestParam String id) {
		return ciservice.getTripData(id);
	}
	
	
	// 도시 목록 페이지
	@GetMapping("/list")
	public List<CityDto> getCityList(){
		return ciservice.getCityList();
	}
}
