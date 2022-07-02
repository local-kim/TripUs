package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDto;
import data.dto.TripDto;

@Mapper
public interface PlanMapper {
	public List<Map<String, Object>> getCityCode(int cityNum);
	public int insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	public List<PlanDto> getNavNum();
	public List<PlanDto> getPlanDatas();
}
