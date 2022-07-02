package data.service;

import java.util.List;
import java.util.Map;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.TripDto;

public interface PlanServiceInter {
	public Map<String, Object> getCityCode(int cityNum);
	public int insertTrip(TripDto trip);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	public void insertItinerary(ItineraryDto itinerary);
}
