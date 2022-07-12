package data.controller;

import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import data.dto.CityDto;
import data.service.SearchService;

@RestController
@CrossOrigin
public class SearchController {

	@Autowired
	private SearchService service;

	@GetMapping("/searchauto")

	public List<CityDto> searchAuto(@RequestParam String searchWord) {
	List<CityDto> list=new Vector<>();
	list=service.searchAuto(searchWord);
	return list;
	}
}
