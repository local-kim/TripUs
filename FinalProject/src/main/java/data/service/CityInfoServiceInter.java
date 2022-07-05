package data.service;

import java.util.List;

import data.dto.CityDto;
import data.dto.TripDto;
import data.dto.WeatherDto;

public interface CityInfoServiceInter {

	// wheatherplace 데이터 가져오기
	public WeatherDto getData(int num);
	
	// 검색되는 도시지역이름으로 지역번호 가져오기
	public void getName(String name);

	// Trip데이타 가져오기
	public TripDto getTripData(String id);
	
//	// 도시 목록 가져오기
//	public List<CityDto> getCityList();
}
