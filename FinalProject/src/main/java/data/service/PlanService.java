package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityDto;
import data.dto.CityTripDto;
import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
import data.dto.PlanDto;
import data.dto.PlanMapDto;
import data.dto.PlanPlaceDto;
import data.dto.TripDto;
import data.mapper.PlanMapper;

@Service
public class PlanService implements PlanServiceInter {

	@Autowired
	private PlanMapper planMapper;
	
	// 일정 만들기 페이지
	@Override
	public CityDto getCityCode(int cityNum) {
		return planMapper.getCityCode(cityNum);
	}
	
	@Override
	public List<PlaceDto> getMyPlaceList(int cityNum, int memberNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("city_num", cityNum);
		map.put("member_num", memberNum);
		
		return planMapper.getMyPlaceList(map);
	}
	
	@Override
	public int insertTrip(TripDto trip) {
		planMapper.insertTrip(trip);
		return trip.getNum();
	}
	
	@Override
	public void insertItinerary(ItineraryDto itinerary) {
		planMapper.insertItinerary(itinerary);
	}
	
	@Override
	public int checkPlace(String contentId) {
		return planMapper.checkPlace(contentId);
	}
	
	@Override
	public void insertPlace(PlaceDto place) {
		planMapper.insertPlace(place);
	}
	
	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum) {
		return planMapper.getTripInfo(tripNum);
	}
	
	public List<PlanPlaceDto> getPlaceList(int tripNum){
		return planMapper.getPlaceList(tripNum);
	}
	
	public void deleteAllItinerary(int tripNum) {
		planMapper.deleteAllItinerary(tripNum);
	}
	
	//////////////////////////////////////////
	public List<PlanDto> getNavNum(int num) {
		return planMapper.getNavNum(num);
	}
	
	public List<PlanDto> getPlanDatas(int num) {
		return planMapper.getPlanDatas(num);
	}
	
	public List<PlanDateDto> getDate(int num) {
		return planMapper.getDate(num);
	}
	
	public List<PlanDateDto> getPlanMember(int num) {
		return planMapper.getPlanMember(num);
	}
	
	public List<PlanMapDto> mapKakao (int num) {
		return planMapper.mapKakao(num);
	}
}
