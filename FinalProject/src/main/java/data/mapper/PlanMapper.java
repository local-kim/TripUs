package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
import data.dto.PlanDto;
import data.dto.TripDto;

@Mapper
public interface PlanMapper {
	public List<Map<String, Object>> getCityCode(int cityNum);
	public List<PlaceDto> getMyPlaceList(Map<String, Integer> map);
	public int insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	
	
	public List<PlanDto> getNavNum(int num);
	public List<PlanDto> getPlanDatas(int num);
	public List<PlanDateDto> getDate(int num);
}
