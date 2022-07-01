package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDto;
import data.dto.TripDto;

@Mapper
public interface PlanMapper {
	public int insertTrip(TripDto trip);
	public void insertPlan(PlaceDto place);
	public void insertItinerary(ItineraryDto itinerary);
	public List<PlanDto> getPlanDatas();
}
