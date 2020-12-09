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
    - #### 29일
      - 예기치 못한 상황을 대비하여 방어코딩 작성 유의
    - #### 30일
      - reduce() 를 활용하여 array 합계 기능 구현
      - input file태그에 webkitdirectory 속성을 설정하여 폴더 단위로 업로드 가능
      - folderPath(폴더의 Path를 보여주는 컴포넌트) 프로젝트 생성
      - class로 객체를 생성하여 이벤트, 함수 관리
  - ### 11월 학습
    - #### 2일 
      - folderPath를 class 객체로 변환 진행 / [[ code 링크 ](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/a774bb67c2b67a1494522b4db13f25a19e263d7b/project/11/1102/1102_script.js#L2)]
      - javascript Class의 getter/setter 학습
      - funciton의 bind(), call(), apply() 학습 
    - #### 3일 
      - folderPath의 기능 및 코드 보완 진행 
      - TableView 프로젝트를 class객체로 변환 진행 [[ code 링크 ](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/a774bb67c2b67a1494522b4db13f25a19e263d7b/project/11/1103/1103_subscript.js#L7)]
      - class 설계원리 및 방법 피드백 진행 
    - #### 4일 
      - folderPath 클래스 객체 재구성 [[ code 링크 ](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/8a57909ffe976ad41fafb29f1158e5b234694b3e/project/11/1104/1104_script.js#L30)]
      - w3 template을 참고하여 프로젝트 UI 수정
    - #### 5일
      - Chrome-Tabs 오픈소스 코드 분석 - [참조 링크](https://github.com/adamschwartz/chrome-tabs)
      - CustomEvent, CSS Custom Property 학습 [[CustomEvent 참고자료 링크](https://im-developer.tistory.com/190)] / [[Custom Property 참고자료 링크](https://velog.io/@kim-jaemin420/CSS-Custom-PropertiesCSS-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%86%8D%EC%84%B1)]
    - #### 6일
      - CSS Custom Property와 LocalStorage를 활용하여 테마 변경 기능 구현
      - Chrome-Tabs 소스코드 분석을 토대로 FolderPath 클래스 재작성 진행
    - #### 9일
      - Polyfill 및 Babel 개념 학습 - [참고자료 1](https://swimfm.tistory.com/entry/%ED%8F%B4%EB%A6%AC%ED%95%84-polyfill-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-feat-IE11) /
      [참고자료 2](https://velog.io/@kwonh/Babel-%ED%8F%B4%EB%A6%AC%ED%95%84polyfill-babelpreset-env)
      - 지난 FolderPath 프로젝트를 IE11 브라우저에 호환 되도록 리빌딩 진행
    - #### 10일
      - Babel을 활용하여 IE11 브라우저 호환성 적용
      - 지난 SearchTable 프로젝트 Class로 변환 진행
    - #### 11일
      - virtual scroll 오픈소스 디버깅을 통한 코드분석 진행 - [[virtual scroll 참고링크](https://jsfiddle.net/jpeter06/y9v2um2e/)]
      - l10n 개념 및 번역 기능 학습 
    - #### 13일
      - virtual scroll 기능 구현 및 성능 테스트 진행
      - 오류 발생 및 성능이 좋지 않아 virtual scroll npm을 설치하여 기능구현 
      - [[virtual scroll github](https://github.com/tbranyen/hyperlist)]
    - #### 16일
      - hyperlist.js (virtual scroll 기능) 소스 코드 분석
      - Object.defineProperty(obj, key, value) 개념 학습
      - window.requestAnimationFrame() 개념 학습
      - Debounce 와 Throttle의 개념 학습
      - DOM Fragment 개념 학습
    - #### 17일
      - l10n.js를 활용하여 웹페이지 언어 변경 기능 구현
      - select2 라이브러리 기능 파악 [[select2 지원사이트](https://select2.org/)]
      - Jquery 학습 진행(Effects, HTML) [[w3school - jQuery](https://www.w3schools.com/jquery/default.asp)]
    - #### 18일
      - select2.js 및 jQuery를 활용하여 select 기능 구현 [[코드 참조](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/b2dbf3a70ffc96f617c5badd52152aba217b2c13/project/11/1118/1118_sub.js#L15 "코드 바로가기")]
      - github의 issue기능을 활용하여 이미지 파일 업로드 가능 확인 [[참고링크](https://cutemoomin.tistory.com/112)]
    - #### 19일 
      - Hangul 라이브러리를 활용하여 select2의 search기능에 초성 검색기능 추가 [[참조 코드](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/0c188900383ca8b35537d8ac58a8a47b08748b54/project/11/1119/1119_script.js#L30 "코드 바로가기")]
      - < Issues > Array 데이터를 Object 변환하는 기능 작성 [[Issues](https://github.com/kimhh-smsoftlab/html5-study-1006/issues/9 "이슈 바로가기")]
    - #### 20일 
      - 달력 컴포넌트 생성을 위한 calendar class 작성 [[참조 코드](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/a5a11576698a7e2654e5d8932b8086aa3edbf8e9/project/11/1120/1120_script.js#L1 "코드 바로가기")]
      ![image](https://user-images.githubusercontent.com/19280103/100164913-4a698e00-2efc-11eb-8612-2c805f03a902.png)
    - #### 23일 
      - calendar의 날짜를 선택하여 해당하는 프로젝트로 이동 기능 구현
      - select 태그를 추가하여 년,월 단위로 달력 이동 기능 구현 [[참조 코드](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/63b608849e8f605b8e24322125eb9448a137a3d4/project/11/1123/calendar.js#L144 "코드 바로가기")]
      ![image](https://user-images.githubusercontent.com/19280103/100165045-9583a100-2efc-11eb-93c2-1e483d5df16e.png)
    - #### 24일
      - calendar 새로고침, 양력 공휴일 표시 기능 추가
      ![image](https://user-images.githubusercontent.com/19280103/100164692-bd263980-2efb-11eb-88ef-2e3aceb7e1ee.png)
      - electron 개념 및 원리 학습 [[electron](https://github.com/electron "electron 깃허브 바로가기")]
    - #### 25일
      - electron 개념정리 [참고 자료](https://cyberx.tistory.com/206 "electron 개념정리 바로가기")
      - [electron-quick-start](https://github.com/electron/electron-quick-start "quick-start 깃허브 바로가기"), [electron-tutorial](https://github.com/goldenthumb/electron-tutorial "electron-tutorial 깃허브 바로가기"), [electron-tutorial-app](https://github.com/crilleengvall/electron-tutorial-app "electron-tutorial-app 깃허브 바로가기") 예제를 활용한 실습 진행
    - #### 26일
      - electron-tutorial-app 예제를 통해 실습 프로젝트 작성
      - 초기 프로젝트
      ![image](https://user-images.githubusercontent.com/19280103/100399019-73bd2200-3094-11eb-8314-a4b9ced2935e.png)
      - 실습 프로젝트
      ![image](https://user-images.githubusercontent.com/19280103/100398860-c64a0e80-3093-11eb-8c48-0af350b46cdc.png)

    - #### 27일
      - ipc 통신을 이용한 서브 브라우져 기능 구현
      ![image](https://user-images.githubusercontent.com/19280103/100431077-01236500-30db-11eb-91e3-f9df282e8c57.png)
      - dialog를 활용하여 파일 open,save 기능 및 messagebox, errorbox 기능 구현 
      ![image](https://user-images.githubusercontent.com/19280103/100431746-eef5f680-30db-11eb-8d46-1fa56ffacb89.png)

    - #### 30일
      - ASCII, 유니코드, UTF-8 개념 학습
      - HexEdit npm을 활용하여 파일 hex 코드로 변환 기능 구현 [url]()
      - Node.js File System 개념 학습 및 readFile 함수 활용
  - ### 12월 학습
    - #### 1일
      - javascript 모듈화, 모듈패턴 개념 학습
      - HexEdit 기능만 추출하여 새 모듈로 재구성 [[github code](https://github.com/kimhh-smsoftlab/html5-study-1006/blob/08f41da1bf9464cf591fed5133944a1973c60b97/project/12/1201/hex-project/assets/hexedit.js#L1 "코드 바로가기")]

    - #### 2일
      - Hi5 로그인 웹 페이지 제작 [[로그인 페이지](https://stackblitz.com/edit/hi5-login-template?file=index.html "stack blitz 바로가기")]
      - jQuery ajax를 통한 로그인 기능 구현

    - #### 3일
      - fetch, axios를 활용한 서버 통신 기능 구현
      - [[fetch 참고 자료](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch "MDN 바로가기"), [axios 참고 자료](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch "깃허브 바로가기")]
      - Hi5 Studio 학습 및 간단한 실습 프로젝트 작성

    - #### 4일
      - Hi5 Studio Tab Control과 formlink를 활용한 탭기능 학습
      - Hi5 Studio Tran Builder를 통한 통신 기능 구현
      - javascript 정규식 학습 

    - #### 7일
      - 정규식 기본 패턴, 표혁식 학습 [[참고 자료](http://www.nextree.co.kr/p4327/ "참고 블로그 바로가기"), [실습 사이트](https://regex101.com/r/cO8lqs/26 "실습 사이트 바로가기")]
      - 정규식을 활용하여 소스코드에서 특정 주석처리된 부분을 가공하는 기능 학습

    - #### 8일
      - 소스코드에서 주석처리된 코드를 정규식을 통해 추출하는 기능 구현
        - `주석 /* */ => (?<=\/\*\s)[^*]*(?=\s\*\/)`
        - `주석 /// => (?<=(?<!\\/)\\/{3}\\s).*`
      - Hi5 모바일 시세화면 구현 및 폼링크 컨트롤 기능 구현

    - #### 9일
      - gulp 라이브러리 학습 및 기능 실습[[gulp github](https://github.com/gulpjs/gulp "gulp 깃허브 바로가기")]
      - Hi5 컨트롤의 생성동작 확인, control js파일 분석 및 수정을 통한 디버깅 진행