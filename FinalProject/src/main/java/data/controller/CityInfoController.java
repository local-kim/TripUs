package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.mapper.CityInfoMapper;
import data.service.CityInfoService;

@RestController
@CrossOrigin
@RequestMapping("/cityinfo")
public class CityInfoController {

	
	@Autowired
	private CityInfoMapper cimapper;
	
	@Autowired
	private CityInfoService ciservice;
	
	
}
