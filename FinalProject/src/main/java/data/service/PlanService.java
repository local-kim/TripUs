package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.PlanDto;
import data.mapper.PlanMapper;

@Service
public class PlanService implements PlanServiceInter {

	@Autowired
	private PlanMapper planMapper;
	
	
	//////////////////////////////////////////
	public List<PlanDto> getPlanDatas() {
		return planMapper.getPlanDatas();
	}
}
