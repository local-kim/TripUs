package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.PlanDto;

@Mapper
public interface PlanMapper {
	public List<PlanDto> getPlanDatas();
}
