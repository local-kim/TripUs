package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.CityTripDto;
import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
import data.dto.PlanDto;
import data.dto.PlanMapDto;
import data.dto.TripDto;

@Mapper
public interface PlanMapper {
	// 일정 만들기 페이지
	public List<Map<String, Object>> getCityCode(int cityNum);
	public List<PlaceDto> getMyPlaceList(Map<String, Integer> map);
	public int insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	
	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum);
	
	
	public List<PlanDto> getNavNum(int num);
	public List<PlanDto> getPlanDatas(int num);
	public List<PlanMapDto> mapKakao(int num);
	public List<PlanDateDto> getDate(int num);
	public List<PlanDateDto> getPlanMember(int num);
}
