package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.WeatherDto;
import data.mapper.CityInfoMapper;
import data.service.CityInfoService;

@RestController
@CrossOrigin
@RequestMapping("/cityinfo")
public class CityInfoController {

	
	
	
	@Autowired
	private CityInfoService ciservice;
	
	@GetMapping("/weather")
	public WeatherDto getDatas(@RequestParam int num) {
		return ciservice.getDatas(num);
	}
}
