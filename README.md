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

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183970760-352d7a19-edc9-417d-b156-43f5d6377c08.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183975640-d54c6ac3-b372-467e-9381-11185bb1dc69.gif"></p>

* 날짜별 일정 편집
* 관광정보 API의 지역기반 조회 서비스에서 불러온 추천 장소와 DB에서 가져온 내가 저장한 장소
* `react-intersection-observer` 패키지를 사용하여 추천 장소 리스트는 스크롤 페이징으로 구현
* 일정에 장소 추가, 삭제
* 일정은 각 날짜의 장소 배열이 날짜 수만큼 있는 2차원 배열로 저장
* `react-beautiful-dnd` 패키지를 사용하여 드래그 앤 드랍으로 일정 순서 변경
* 지도 위에서 경로 보기
* `redux`를 사용하여 일정 배열을 전역으로 저장

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183984155-1ac56c73-72cb-4e89-9a7e-77a7f0d28d7b.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/63040140/183984169-c972e883-cc07-466e-8113-f738ce9ae321.gif"></p>

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

## 장소 페이지
<p align="center">
<img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205443228-f606e235-7c6d-44d0-b89e-2ad7977487d8.gif">
</p>

* useParams를 이용하여 도시페이지에서 contentId 받아옴
* 관광정보 API에 contentId를 넣어 관광지 세부정보 출력

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205443825-fb972633-b09c-4999-99f1-35f5b548354c.gif"><img width="50%" alt="ㅇ" src="https://user-images.githubusercontent.com/74584001/205473749-a11b6e13-f223-45c4-9263-87f3dd03c16c.gif"></p>

* 장소에 대한 총 좋아요 수
* 장소 좋아요 체크 및 해제

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205444074-620dc321-da0f-4e22-8ae4-0f288e66e278.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205444134-63283076-d399-4d23-b9d6-1211c1b38b5d.gif"></p>

* 로그인 전 리뷰 작성 시 경고  
* 로그인 후 리뷰 작성 및 별점
* 평균 별점 확인

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205444926-a9920a4d-df17-44b6-8071-694e702071ea.gif"><img width="50%" alt="ㅇ" src="https://user-images.githubusercontent.com/74584001/205475548-d7cfb428-907f-4864-86ad-5c6409853870.gif"></p>

* 리뷰 수정 및 삭제

<p align="center"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205475686-145a8467-ea07-4b31-a7e6-6650123a15ba.gif"><img width="50%" alt="" src="https://user-images.githubusercontent.com/74584001/205445182-43389449-b78d-42c3-8ee7-5da6b999b577.gif"></p>

* 리뷰 목록 및 상세보기 

---

## 희민

---

## 서윤

---

## 일웅

---
