package data.service;

import data.dto.CityInfoDto;
import data.dto.WeatherDto;

public interface CityInfoServiceInter {

	// wheatherplace 데이터 가져오기
	public WeatherDto getData(int num);
	
	// 검색되는 도시지역이름으로 지역번호 가져오기
	public void getName(String name);

	
}
