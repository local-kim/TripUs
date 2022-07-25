package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.CityDto;
import data.dto.CityTripDto;
import data.dto.ItineraryDto;
import data.dto.PlaceDto;
import data.dto.PlanDateDto;
import data.dto.PlanDto;
import data.dto.PlanMapDto;
import data.dto.PlanPlaceDto;
import data.dto.TripDto;
import data.dto.TripRankDto;

@Mapper
public interface PlanMapper {
	// 일정 만들기 페이지
	public CityDto getCityCode(int cityNum);
	public List<PlaceDto> getMyPlaceList(Map<String, Integer> map);
	public int insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	
	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum);
	public List<PlanPlaceDto> getPlaceList(int tripNum);
	public void deleteAllItinerary(int tripNum);
	
	// 인기 일정
	public List<TripRankDto> getTripRank();
	public List<TripRankDto> getTripRank3();
	
	// 일정 상세 페이지
	public List<PlanDto> getNavNum(int num);
	public List<PlanDto> getPlanDatas(int num);
	public List<PlanMapDto> mapKakao(int num);
	public List<PlanDateDto> getDate(int num);
	public List<PlanDateDto> getPlanMember(int num);
	
	// 일정 좋아요
	public int getPlanLike(Map<String ,Integer> map);
	public int insertPlanLike(Map<String,Integer> map);
	public int deletePlanLike(Map<String,Integer> map);
	public int getTotalLike(int num);
}
