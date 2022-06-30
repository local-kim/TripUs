package data.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/plan")
public class PlanController {
	
	@PostMapping("/insert")
	public void insert() {
		System.out.println("insert plan");
	}
}
