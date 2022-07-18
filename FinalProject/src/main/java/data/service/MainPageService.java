package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.CityDto;
import data.mapper.MainPageMapper;

@Service
public class MainpageService implements MainpageServiceInter {
	
	@Autowired
	MainPageMapper mapper;

	@Override
	public List<CityDto> getData() {
		// TODO Auto-generated method stub
		
		
		return mapper.getData();
		
	}

}
