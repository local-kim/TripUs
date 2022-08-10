# Trip:Us
<p align="center"><img width="200" alt="logo" src="https://user-images.githubusercontent.com/63040140/183838909-ae6dd896-889a-43bf-b7dc-8ac7868af882.png"></p>

> 장기화된 코로나 펜데믹 현상으로 인해 외부 활동이 제한되어 답답했던 그 동안의 우리들의 마음을 위로해줄 국내 여행 계획, 공유 사이트

### Feature
* 국내 지역별 관광지
* 여행지 날씨 정보
* 지도 위에서 확인하는 여행 경로
* 내가 만든 일정 공유
* 사용자들이 남기는 장소 리뷰 & 별점

### Tool
* Java, Spring Boot, Spring Security, MyBatis
* React, Axios, Redux
* AWS, MySQL

### API
* 한국관광공사 Tour API
* 기상청 날씨 API
* 다음 우편번호 API
* 카카오 지도 API
* 카카오 공유하기 API
* 카카오 로그인 API

### Contributor
* 김서윤 : 로그인, 회원가입, 소셜 로그인
* 김현지(팀장) : 일정 생성, 일정 수정, 여행지 목록, 인기 일정, 유저 페이지
* 김희민 : 헤더, 메인 페이지, 마이페이지, 프로필 수정, 일정 공유, 여행 일정 캘린더
* 단시연 : 장소 상세 페이지, 장소 저장, 별점/리뷰
* 정일웅 : 일정 상세 페이지
* 최재호 : 여행지 상세 페이지, 여행 기간 날씨, 장소 목록, 장소 저장

## 일정 만들기
<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183881985-aab6eb9f-2242-4d42-875a-f690cd6f4670.gif"></p>

* `react-date-range` 패키지를 사용하여 캘린더에서 여행 기간 선택

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183887316-b9bf00e2-053b-4c43-8f81-47a600a1dce5.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183891376-971c66de-9c95-4272-afe2-7f6d4715edad.gif"></p>

* 관광정보 API의 지역기반 조회 서비스에서 불러온 추천 장소와 DB에서 가져온 내가 저장한 장소
* `react-intersection-observer` 패키지를 사용하여 추천 장소 리스트는 스크롤 페이징으로 구현
* 일정에 장소 추가, 삭제
* 일정은 각 날짜의 장소 배열이 날짜 수만큼 있는 2차원 배열로 저장
* `react-beautiful-dnd` 패키지를 사용하여 드래그 앤 드랍으로 일정 순서 변경
* 지도 위에서 경로 보기
* `redux`를 사용하여 일정 배열을 전역으로 저장

(이미지 넣을건데 api가 말썽이에요)
* 관광정보 API의 키워드 검색 서비스를 이용한 장소 검색
* 장소 카테고리 필터링

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183895437-41254a7f-e035-4e72-a451-a2a23a98afa9.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183895446-8d7a35d6-b87f-4bbf-b7ae-686a42671aad.gif"></p>

* 전체 날짜별 일정과 경로 보기
* 페이지 이탈 경고
* 일정 생성 버튼을 누르면 여행 정보(도시, 기간)와 일정(장소 id, day, order)이 DB에 저장 후 일정 상세 페이지로 이동

## 인기 일정
<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183935964-edf53b6b-08e2-430b-b64f-9da9d3a94a0b.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183937511-37f5ed43-2bc9-497d-8e73-330c2875e3fd.gif"></p>

* DB에서 좋아요 순으로 일정을 가져옴
* 계절별 추천 일정 토글 버튼
* 일정의 시작 날짜의 달을 가져와 3-5월, 6-8월, 9-11월, 12-2월을 각 봄, 여름, 가을, 겨울로 분류

## 유저 페이지
<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183941054-b98e6c57-90ad-4444-8965-0611692c0089.gif"></p>

* 다른 회원이 생성한 일정과 작성한 후기를 볼 수 있음

## 도시 페이지
<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183892421-7a71999b-25a8-457a-90b3-5d783ea34ea1.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183892489-9c95419d-c060-42cb-8b8a-9782063b098a.gif"></p>

* 도시 검색

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183888510-b8d1c250-a3d7-4b30-827f-92f1308e0881.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183888669-c6f39860-cc54-4665-8d29-9c665824e9d1.gif"></p>

* 도시 이미지 및 일정, 날씨 확인

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183888725-373f845a-3461-4e9e-afe3-2871d3d91fef.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183899352-c6434898-cced-456b-abea-f111f2572cbf.gif"></p>

* 카테고리별 장소 리스트 및 좋아요

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183902047-e4e42e21-4053-4443-bb2a-14707cdd8f30.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/100552783/183901177-f96cae50-d9ec-4857-9bbf-8d91e3b439cf.gif"></p>

* 카테고리별 더보기 및 키워드 검색

---

## 희민

---

## 시연

---

## 서윤

---

## 일웅

---
