package data.mapper;

import java.util.List;

import data.dto.CityDto;

public interface SearchMapper {
	public List<CityDto> searchAuto(String searchWord);

}
