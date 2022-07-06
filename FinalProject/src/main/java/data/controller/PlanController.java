package data.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
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
	
	@GetMapping("/city-code")
	public Map<String, Object> getCityCode(
			@RequestParam int cityNum
			){
		return planService.getCityCode(cityNum);
	}
	
	@GetMapping("/my-place-list")
	public List<PlaceDto> getMyPlaceList(
			@RequestParam int cityNum
			){
		// 임시 회원 번호
		int memberNum = 3;
		
		return planService.getMyPlaceList(cityNum, memberNum);
	}
	
	@PostMapping("/insert")
	public int insert(
			@RequestBody PlanInsertDto dto
			) throws Exception {
		List<List<PlaceDto>> plan = dto.getPlan();
		TripDto trip = dto.getTrip();
		
//		System.out.println(plan);
//		System.out.println(trip);
		
		// trip(여행 전체 정보)를 insert
		// member_num, city_num, start_date, end_date, days
		trip.setMemberNum(1);	// 임시값
		
		// 방금 인서트한 trip_num을 받아와서 리턴
		int tripNum = planService.insertTrip(trip);
		
		for(int i = 0; i < plan.size(); i++) {
			for(int j = 0; j < plan.get(i).size(); j++) {
				PlaceDto place = plan.get(i).get(j);
				
				// place가 테이블에 없으면 insert
				// place_id,,,
				place.setCity_num(trip.getCityNum());
//				System.out.println(place);
				
				if(planService.checkPlace(place.getContentid()) == 0) {
					planService.insertPlace(place);
				}
				
				// itinerary(여행 일정 순서)를 insert
				// trip_num, day, order, place_id
				ItineraryDto itinerary = new ItineraryDto();
				itinerary.setTrip_num(tripNum);
				itinerary.setDay(i + 1);
				itinerary.setOrder(j + 1);
				itinerary.setPlace_id(place.getContentid());
				
				planService.insertItinerary(itinerary);
			}
		}
		
		return tripNum;
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	@GetMapping("/nav")
	public List<PlanDto> getNavNum(@RequestParam int num){
		return planService.getNavNum(num);
	}
	
	@GetMapping("/list")
	public List<PlanDto> getPlanDatas(@RequestParam int num){
		return planService.getPlanDatas(num);
	}
	
	@GetMapping("/pdate")
	public List<PlanDateDto> getDate(@RequestParam int num) {
		return planService.getDate(num);
	}
}
