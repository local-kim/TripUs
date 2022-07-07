package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.mapper.SearchMapper;

@Service
public class SearchService implements SearchServiceInter {
	
	@Autowired
	SearchMapper mapper;

	@Override
	public List<String> searchAuto(String searchWord) {
		// TODO Auto-generated method stub
		return mapper.searchAuto(searchWord);
	}
}
