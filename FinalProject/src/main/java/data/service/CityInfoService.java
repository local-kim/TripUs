package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityDto;
import data.dto.TripDto;
import data.dto.WeatherDto;
import data.mapper.CityInfoMapper;

@Service
public class CityInfoService implements CityInfoServiceInter {
	
	@Autowired
	private CityInfoMapper cimapper;
	
	@Override
	public WeatherDto getData(int num) {
		// TODO Auto-generated method stub
		return cimapper.getData(num);
	}
	
	@Override
	public void getName(String name) {
		// TODO Auto-generated method stub
		cimapper.getName(name);
	}
	
	@Override
	public TripDto getTripData(int member_num, int city_num) {
		// TODO Auto-generated method stub
		return cimapper.getTripData(member_num, city_num);
	}
	
	@Override
	public List<CityDto> getCityList() {
		return cimapper.getCityList();
	}
}
