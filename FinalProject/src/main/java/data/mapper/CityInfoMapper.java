package data.mapper;

import org.apache.ibatis.annotations.Mapper;

import data.dto.WeatherDto;



@Mapper
public interface CityInfoMapper {

	// wheatherplace 데이터 가져오기
	public WeatherDto getData(int num);
	
	// 검색되는 도시지역이름으로 지역번호 가져오기
	public void getName(String name);
	
}
