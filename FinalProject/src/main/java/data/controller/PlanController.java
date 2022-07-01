package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.PlaceDto;
import data.dto.PlanDto;
import data.service.PlanService;

@RestController
@CrossOrigin
@RequestMapping("/plan")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@PostMapping("/insert")
	public void insert(
//			@RequestBody Map<String, Object> paramMap,
			@RequestBody List<List<PlaceDto>> param
//			@RequestBody String plan
			) throws Exception {
//		System.out.println(param);
//		System.out.println(param.get(0));
//		System.out.println(param.get(0).get(0));
		
		for(int i = 0; i < param.size(); i++) {
			for(int j = 0; j < param.get(i).size(); j++) {
				System.out.println("day " + (i+1) + " - place " + (j+1));
				System.out.println(param.get(i).get(j));
			}
		}
//		JSONObject jObject = new JSONObject(jsonString);
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	@GetMapping("/nav")
	public List<PlanDto> getNavNum(){
		return planService.getNavNum();
	}
	
	@GetMapping("/list")
	public List<PlanDto> getPlanDatas(){
		return planService.getPlanDatas();
	}
}
