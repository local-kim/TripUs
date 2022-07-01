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
	public void insertPlan(PlaceDto place) {
		planMapper.insertPlan(place);
	}
	
	@Override
	public void insertTrip(TripDto trip) {
		planMapper.insertTrip(trip);
	}
	
	@Override
	public void insertItinerary(ItineraryDto itinerary) {
		planMapper.insertItinerary(itinerary);
	}
	
	//////////////////////////////////////////
	public List<PlanDto> getNavNum() {
		return planMapper.getNavNum();
	}
	
	public List<PlanDto> getPlanDatas() {
		return planMapper.getPlanDatas();
	}
}
