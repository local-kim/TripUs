package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityDto;
import data.dto.TripDto;
import data.mapper.CityInfoMapper;

@Service
public class CityInfoService implements CityInfoServiceInter {
	
	@Autowired
	private CityInfoMapper cimapper;
	
	@Override
	public CityDto getData(int num) {
		// TODO Auto-generated method stub
		return cimapper.getData(num);
	}
	
	// city랑 trip이랑 join 써본거
//	@Override
//	public List<CityDto> getData(int num) {
//		// TODO Auto-generated method stub
//		return cimapper.getData(num);
//	}
	
//	@Override
//	public void getName(String name) {
//		// TODO Auto-generated method stub
//		cimapper.getName(name);
//	}
	
	@Override
	public List<TripDto> getTripData(int member_num, int city_num) {
		// TODO Auto-generated method stub
		return cimapper.getTripData(member_num, city_num);
	}
	
	// 현지씌 작품 돈터치!!!
	@Override
	public List<CityDto> getCityList() {
		return cimapper.getCityList();
	}
}
