package data.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.CityTripDto;
import data.dto.TripDto;
import data.mapper.MyPageMapper;
import data.service.MypageService;

@RestController
@CrossOrigin
public class CalendarController {
	
	@Autowired
	private MypageService service;
	
	@Autowired
	MyPageMapper mapper;
	
	
	
	@GetMapping("/calendar")
	public List<TripDto> calendar(@RequestParam int loginNum) {
	
		
		
		return service.getAllDates3(loginNum);
	}

	
	

}
