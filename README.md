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
        > - 객체의 childNodes를 이용하여 자식 요소 데이터 변경    
        > 
        ```
        let tr_group_down = document.getElementsByClassName('down');
        let i,j;
        for(i=0; i<tr_group_down.length; i++){
          for(j=0; j< tr_group_down[i].childNodes.length; j++){
            tr_group_down[i].childNodes[j].textContent = data[i][j];
          }
        }
        ```   
        > - 깃허브 markdown 학습  
        > - [1019 - StackBlitz 프로젝트](https://stackblitz.com/edit/html5-css-javascript-study?file=project/1019/1019_script.js)
     - 20일














