# 김현호 HTML교육용 프로젝트 (2020년 10월 5일 ~ 2020년 12월 30일)

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/html5-css-javascript-study)

# HTML5 교육용
  - 상호 교육내용 공유 및 review등을 하고자 합니다.
    ( 이슈 탭 페이지에 문제점 및 수정내역을 각자 기술)

# 이슈 항목에 JSON, XML 개념과 학습하기 링크 구성
   - JSON, XML 형식 기본 개념과 상호 구조차이점, 작성법 연습하기
   
# 학습내용
  - ### 10월 학습
    - #### 19일    
      - 객체의 childNodes를 이용하여 자식 요소 데이터 변경    
      - 깃허브 markdown 학습  
      - [1019 - StackBlitz 프로젝트](https://stackblitz.com/edit/html5-css-javascript-study?file=project/1019/1019_script.js)    
    - #### 20일
      - array함수 학습
        - find, findIndex, indexOf, lastIndexOf, forEach
        - splice, slicepop, push, shift, unshift
      - 에로우 함수의 장,단점
      - filter( ), map( ) 함수의 원리 및 중요성
      - 디버깅 방법 및 중요성 학습
    - #### 21일
      - filter( ), map( )함수 활용
      - 1020 실습프로젝트 추가기능 구현
        > 1. text입력을 받아 테이블에 표시할 데이터 필터기능
        > 2. checkbox를 통해 검색에 사용될 데이터 프로퍼티 선택 (부분검색/완전일치검색 등)
      - 구현된 코드 최적화 진행
    - #### 22일
      - searchData(), getCheck(), filterData() 최적화 진행 - [code 링크](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/a5fc5f7c0ab68b205e96e1179beb372054c924d9/project/1022/1022_script.js#L64) / [wiki 링크](https://github.com/kimhh-smsoftlab/html5-study-1006/wiki/%ED%95%99%EC%8A%B5-%EB%85%B8%ED%8A%B8#searchdata--%EC%B5%9C%EC%A0%81%ED%99%94)
      - public, lib 폴더 생성 : 공용 데이터 관리
      - JSON.stringify(value[, replacer[, space]])    
       -> value : object / replacer() : 문자열화 동작 방식 변경 / space : 가독성을 목적으로 JSON 문자열 출력에 공백을 삽입
    - #### 23일
      - number타입 toString()과 + " " ; 공백 더하기 방법
      - 프로젝트 FileSaver.js 라이브러리를 이용한 file 다운로드 기능 구현 => Blob(Binary Large Object)객체 활용
      - Math 함수를 활용하여 byte 사이즈 단위 변환 기능 구현   
    - #### 26일
      - 테이블을 반복적으로 제거,생성의 방식에서 Display값을 수정하여 테이터 화면 전환 방식으로 수정 => setDisplay(), showElement(), hideElement() 추가 / [code 링크](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/61be3bf63b240dedf8819d6100a007855d688de6/project/1026/1026_script.js#L71)
      - XMLSerializer() Web API를 사용하여 현재 웹페이지의 HTML파일 다운로드 기능 구현 / [참고자료 링크1](https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer),   [참고자료 링크2](https://eligrey.com/demos/FileSaver.js/)
      - 전역변수 사용 최소화 
    - #### 27일
      - document에 리스너를 등록하여 여러개의 클릭 이벤트를 하나로 처리
      - w3.js 라이브러리의 show, hide, toggle, addclass, filter 함수 학습 및 적용
    - #### 28일
          - DOMTokenList Web API 학습 및 활용 - [참고 링크](https://developer.mozilla.org/ko/docs/Web/API/DOMTokenList)
          - JSDoc를 활용한 주석 작성법 학습 - [참고 링크](https://jsdoc.app/about-getting-started.html#getting-started)
          - Node.insertBefore() 학습 및 활용 - [참고 링크](https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore)