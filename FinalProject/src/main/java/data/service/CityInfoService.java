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
	public WeatherDto getDatas(int num) {
		// TODO Auto-generated method stub
		return cimapper.getDatas(num);
	}
}
