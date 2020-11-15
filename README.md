# 한국소프트웨어산업협회 최종 프로젝트 : 프로젝트 마디

## 개요

- 기간 : 2017.11 ~ 2017.12
- 인원 : 총 4명
- OS 및 DB : Windows 7 Professional K, Oracle 11g
- 사용 언어 : Java, SQL, HTML5, JavaScript, JSP, CSS 3.0
- 프레임워크 : Spring Framework 3.1.1, JQuery 3.2.1, BootStrap 3.3.2, MVC Framework, MyBatis

## 기능 소개

- 재료를 데이터베이스에 저장해 요리 레시피를 검색해주는 서비스입니다.
- 기본적으로 음식 이름 자체로 검색이 가능합니다.
- 게시글 작성, 게시글 보기, 친구추가와 삭제기능이 있는 SNS입니다.
- 레시피 클릭 시 그 레시피를 만드는 법을 사진과 함께 보여줍니다.
- 알림 기능으로 상대방이 친구 요청을 하거나 좋아요 버튼을 누른 것을 알려줍니다.
- 이용자의 편의성을 높이기 위해 비동기화 방식으로 페이지를 구성합니다.

## 담당 업무, 역할

- 주제 선정, CSS 디자인 틀 제작, 재료 자료들 정리합니다.
- 헤더 제작, 디자인(회원정보칸, 메시지칸, 냉장고칸)
- 사용자 개인 페이지 제작
  - 팔로우, 팔로잉 회원 목록
  - 팔로우, 팔로잉 추가하기
  - 자신의 글 목록, 친구의 글 목록 출력

## 설정 방법

- 서버는 Tomcat v9.0 으로 설정합니다. 이클립스의 Windows -> Preference -> Server -> Runtime Environments 에서 Add 로 Tomcat 을 추가합니다.
- 프레임워크에 프로젝트 폴더를 불러온 후 폴더에 우클릭 -> Properties -> Java Build Path 에서 Library 로 접속합니다.
  - 우선 JRE System Library 를 설정한 후 검색에 쓰일 shineware-ds-1.0.jar 와 shineware-common-2.0.jar, 그리고 komoran-2.0.4-beta-e.jar 파일을 Edit 에 들어가서 경로를 지정합니다. 셋은 Madi/lib 안에 들어있습니다.
- Oracle Database 11g release 2 를 설치하고 SQL Developer 를 설치합니다. 그리고 Excel 폴더에서 SQL 문이 있는 텍스트 파일을 열러 쿼리문을 작성합니다.
- 테이블을 작성한 후 Excel 폴더에 있는 엑셀 파일을 이용해 테이블에 데이터 import 합니다.
  - import 순서 : nation / recipe_type / irdnt_type(sql문 실행해 주세요) / recipe_info / recipe_irdnt / recipe_process
