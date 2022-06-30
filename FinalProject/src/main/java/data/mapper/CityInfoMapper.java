package data.mapper;

import org.apache.ibatis.annotations.Mapper;

import data.dto.WeatherDto;



@Mapper
public interface CityInfoMapper {

	// wheatherplace 데이터 가져오기
	public WeatherDto getDatas(int num);
	
}
