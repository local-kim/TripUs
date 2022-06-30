package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.PlanDto;
import data.service.PlanService;

@RestController
@CrossOrigin
@RequestMapping("/plan")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@PostMapping("/insert")
	public void insert() {
		System.out.println("insert plan");
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	@GetMapping("/list")
	public List<PlanDto> getPlanDatas(){
		return planService.getPlanDatas();
	}
}
