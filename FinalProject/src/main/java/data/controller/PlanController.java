package data.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDto;
import data.dto.PlanInsertDto;
import data.dto.TripDto;
import data.service.PlanService;

@RestController
@CrossOrigin
@RequestMapping("/plan")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@PostMapping("/insert")
	public void insert(
//			@RequestBody List<List<PlaceDto>> plan,
//			@RequestBody TripDto trip
			@RequestBody PlanInsertDto dto
			) throws Exception {
		List<List<PlaceDto>> plan = dto.getPlan();
		TripDto trip = dto.getTrip();
		
//		System.out.println(plan);
//		System.out.println(trip);
//		List<List<PlaceDto>> plan = paramMap.plan;
		
		// trip(여행 전체 정보)를 insert
		// member_num, city_num, start_date, end_date, days
		trip.setMemberNum(1);	// 임시값
//		trip.setCity_num(2);		// 임시값
		
		System.out.println(trip);
		
		// trip_num을 받아와서 리턴
		int tripNum = planService.insertTrip(trip);
		System.out.println(tripNum);
		
		for(int i = 0; i < plan.size(); i++) {
			for(int j = 0; j < plan.get(i).size(); j++) {
				PlaceDto place = plan.get(i).get(j);
				
				System.out.println("day " + (i+1) + " - place " + (j+1));
				System.out.println(plan.get(i).get(j));
				
				// place가 테이블에 없으면 insert
				// place_id,,,
//				System.out.println(place.getContentid());
				
				// itinerary(여행 일정 순서)를 insert
				// trip_num, day, order, place_id
				ItineraryDto itinerary = new ItineraryDto();
				itinerary.setTrip_num(tripNum);
				itinerary.setDay(i + 1);
				itinerary.setOrder(j + 1);
				itinerary.setPlace_id(place.getContentid());
			}
		}
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
