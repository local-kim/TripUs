package data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.mapper.CityInfoMapper;

@Service
public class CityInfoService implements CityInfoServiceInter {
	
	
	@Autowired
	private CityInfoMapper cimapper;
}