package data.mapper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.fasterxml.jackson.annotation.JsonFormat;

import data.dto.CityDto;
import data.dto.CityTripDto;
import data.dto.MemberDto;
import data.dto.ProfileDto;

import data.dto.TripDto;



@Mapper
public interface MainPageMapper {
	

	//도시 정보 가져오기
	public List<CityDto> getData();
	
}
