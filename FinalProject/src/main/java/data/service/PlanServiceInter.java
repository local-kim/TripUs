package data.service;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.TripDto;

public interface PlanServiceInter {
	public void insertPlan(PlaceDto place);
	public void insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
}
