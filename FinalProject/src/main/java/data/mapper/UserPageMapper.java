package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.CityTripDto;
import data.dto.MemberDto;
import data.dto.ReviewPlaceDto;

@Mapper
public interface UserPageMapper {
	public MemberDto getUserInfo(int memberNum);
//	public int getTripCount(int memberNum);
//	public int getReviewCount(int memberNum);
	public List<CityTripDto> getTripList(int memberNum);
	public List<ReviewPlaceDto> getReviewList(int memberNum);
}
