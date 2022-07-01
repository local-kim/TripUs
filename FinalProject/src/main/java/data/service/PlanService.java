package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDto;
import data.dto.TripDto;
import data.mapper.PlanMapper;

@Service
public class PlanService implements PlanServiceInter {

	@Autowired
	private PlanMapper planMapper;
	
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
	
	//////////////////////////////////////////
	public List<PlanDto> getNavNum() {
		return planMapper.getNavNum();
	}
	
	public List<PlanDto> getPlanDatas() {
		return planMapper.getPlanDatas();
	}
}
