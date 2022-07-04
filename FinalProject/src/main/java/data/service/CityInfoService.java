package data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	
}
