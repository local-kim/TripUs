package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityTripDto;
import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
import data.dto.PlanDto;
import data.dto.PlanMapDto;
import data.dto.TripDto;
import data.mapper.PlanMapper;

@Service
public class PlanService implements PlanServiceInter {

	@Autowired
	private PlanMapper planMapper;
	
	@Override
	public Map<String, Object> getCityCode(int cityNum) {
		return planMapper.getCityCode(cityNum).get(0);
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
	
	public CityTripDto getTripInfo(int tripNum) {
		return planMapper.getTripInfo(tripNum);
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
