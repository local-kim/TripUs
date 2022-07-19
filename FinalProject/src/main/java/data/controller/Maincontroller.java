package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.CityDto;
import data.mapper.MainPageMapper;
import data.service.MainPageService;



@RestController
@CrossOrigin
public class Maincontroller {
	
	@Autowired
	private MainPageService service;
	
	@Autowired
	MainPageMapper mapper;
	
	@GetMapping("/cityData")
	public List<CityDto> cityData() {
	
		
		return service.getData();
	}
}


