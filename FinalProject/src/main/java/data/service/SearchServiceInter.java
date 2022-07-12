package data.service;

import java.util.List;

import data.dto.CityDto;

public interface SearchServiceInter {
	public List<CityDto> searchAuto(String searchWord);
}


