package data.service;

import data.dto.CityInfoDto;
import data.dto.WeatherDto;

public interface CityInfoServiceInter {

	// wheatherplace 데이터 가져오기
	public WeatherDto getDatas(int num);

	
}
