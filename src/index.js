// // @ts-check

// // // @ts-check 타입을 체크할건지 설정

// // Node.js란?
// // 자바스크립트를 써서 데이터 베이스에 연결해 서버로 요정을 보내는 기능을 구현할 수 있다.
// // node.js는 크롬 vs 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다.
// // node.js를 웹 서버 자체로 생각하는것은 잘못된 것
// // => 아파치 같은 웹서버중 하나가 아니라
// // 자바스크립트로 브라우저가 아니라 서버에서 자바스크립트가 동작하도록 도와주는 런타임 플렛폼이라고 생각하면 된다.

// // 2009년에 라이언 달이라는 개발자가 node.js를 처음 만들었고 지금까지도 업데이트가 잘 되고있다.
// // node.js를 설치해서 실행한다고 웹서버가 실행되는게 아니고  node.js에 있는 라이브러리를
// //npm(node package manager)를 이용해서 설치해서 사용할 수 있다.

// //node.js의 특징 3개

// //1 자바스크립트로 백엔드 서버 로직을 개발할 수 있다(장점)
// // 2. 구글에서 개발한 js엔진을 쓰기 때문에 속도가 빠르다(인터프리터 방식)
// //3. 논 블로킹 방식 node.js의 모든 API는 비동적으로 작동하며 호출 후 다른 API를 바로 불러올 수 있다.
// // 한번 불러왔던 API를 요청하면 이벤트루프가 확인해서 동작

// // node.js가 왜 생겼냐면
// //  방대한 오픈소스 생태계를 구축하기 위해서
// // npm(node pakage manager)를 사용해서 패키지들을 다운받을 수 있고, 리액트 익스프레스 코아 등과 같은 익숙한 것들의 패키지들은 다 npm에 등록되어있다.

// // 특수한 것을 만드는 사람이 아닌이상 거의 다 기능이 이미 나와있는 것들이 많다.
// // 잘쓰면 빠르고 좋은 효과를 볼 수 있다.

// // 모듈
// // 패키지는 클래스의 묶음, 패키지의 모임이 모듈
// // 기능들의 모임, 파일의 모임

// // require를 많이 사용할 예정
// // node.js의 require가 무엇인가?

// //require (경로나 이동)
// const http = require("http");

// // http 객체안의 createServer 함수를 사용해서 서버를 만듬
// // http.createServer를 변수에 담으면 서버가 되는 부분을 반환 받을 수 있다.
// const server = http.createServer((req, res) => {
//   // req 요청값
//   // 404 500 이런 오류들
//   // http에서 ok를 나타내는 번호가 200번이라서
//   req.statusCode = 200;
//   // 100번대 :  정보응답
//   // 200번대 : 성공응답
//   // 300번대 : 리다이렉션 메세지, 요청한 url이 변경되었을때
//   // 400번대 : 클라이언트 상의 오류, 클라이언트에 오류가 있을때
//   // 500번대 : 서버오류 응답, 서버에 오류가 있을 때
//   // write - 문자를 싸서 보내주는 함수
//   res.write("123");
//   // end함수 끝맺음 매개변수 문자를 보내주면서 끝
//   res.end("456");
// });

// const PORT = 3000;

// // 서버가 되는  server에 함수를 사용한다. 서버를 열어줌
// // listen 함수로 서버를 열어줌
// server.listen(PORT, () => {
//   console.log("port : ", PORT);
// });

// // server 객체의 준비가 되면 listen 함수로 해당 포트에 서버를 대기시킨다.
// // 서버를 대기시키는 이유는 클라이언트에서 요청이 오면 서버가 받아서 처리할 수 있다
// // 여기 들어가는 매개 변수는  (포트번호, 호스트의 이름, 백 로그, 콜백함수)

// // node.js 실행하는 법
// // node 자바스크립트 파일의 경로

// // 이렇게만 해도 웹서버가 열린다.

// //node.js 코딩을 해볼 수 있는 곳 테스트용 코드들
// // 코드 샌드박스, glitch 등등
// // 노드 서버를 바로 볼 수 있고 코딩도 바로바로 테스트 해볼 수 있다.

// // glith 장점
// // https 검증도 되어있는 웹 서버를 테스트로 사용해 볼 수 있다.
// // node 프로젝트 생성 버튼을 누르고
// // server.js에 서버 로직을 작성한 후 바로
// // preview 버튼을 눌러서 위에 버튼은 바로 그 창에서 화면을 볼 수 있고
// // 테스트용 링크가 필요하면 preview 버튼 눌렀을때 preview in a new window이 버튼을 누르면
// // 클라이언트 요청을 보내볼 웹서버 주소로 접속이 된다.
// // 그래서 테스트에 용이하게 사용할 수 있다.

// // node.js 버전관리
// // 버전관리하는 방법 : 서버노드는 최신인데 로컬노드가 구버전이면
// // 최신버전은 기능이 있는데 구버전에 없을경우 : 기능이 실행되지 않는다
// // 이런 버전 문제가 생겼을 경우 해결해주는 아이 물론 우리가 조작을 헤줘야 한다.
// // 삭제했다 깔았다 하면 쉬운데 귀찮으니까.
// // nvm(node Version Manager)
// // 윈도우 https://github.com/coreybutler/nvm-windows/releases
// // 접속해서 다운받으면 된다.
// // https://nodejs.org/ko/download/releases/ => 이전버전들
// //윈도우 에서는 nvm-setup.zip을 설치하고
// // 맥 tj /n(Node)

// //nvm이 잘 설치되어있는지 확인 nvm -v 버전확인

// // nvm에 설치되어있는 버전확인 명령어
// // nvm ls

// // nvm 변경할 node버전 설치 명령어
// // nvm install v(여기에 해당버전)

// // node 설치된 버전을 적용하는 명령어 버전 바꿔주는 명령어
// // nvm use 바꿀 버전

// // state 오류가 발생하면 cmd를 관리자 권한으로 실행해야한다.

// ===================================================

/* ㅡㄱmysql 프ㅜ로젝트에 연결
 mysql npm 설치 명령어
 mysql은 콜배 기반이기 때문에 promise를 사용하지 못하기 때문에 mysql2를 쓸거고
 mysql을 보안한다고하면 promise-mysql 을 설치해서 사요ㅕㅇ해야한다.
 mysql2는 promise를 지원하기 때문에 바로 써도된다.

 ------------------
  npm i mysql2
  -------------------------
*/

const mysql = require("mysql2");

// 커넥션의 옵션
// host : 연결할 호스트를 나타냄
// port : 연결할 포트
// user : 사용자의 이름
// password : 사용자 비밀번호
// database : 연결할 데이터 베이스 이름
// debug : 디버그 모드를 사용할 것인지
const temp = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "test4",
});

// database : 'test4' => test4 이름의 데이터 베이스를 사용하겠다.
// query함수의 첫번째 매개변수는 쿼리문을 입력해주고
// 두번째 매개변수는 콜백 함수 매개변수는 첫번째 쿼리 에러, 두번째 쿼리 결과
// 이후 등등
temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    console.log("Error");
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
  } else {
    console.log(res);
  }
});

const http = require("http");

const server = http.createServer((req, res) => {
  req.statusCode = 200;
  // 한글이 왜깨지는 걸까? 인코딩 방식을 정해보자
  /* res setHeader(내용) 함수를 사용해서 헤더의 정보를 설정할 수 있다.
    utf-8로 컨텐츠 내용을 인코딩하는 속성을 추가한다하면.
  */
  res.setHeader("Content-Type", "application/json", "charset=utf-8");

  // 요청된 url 확인
  /* req.url
 
  
    요청된 method확인
    req.method

    js 내용이 수정되었을때 자동으로 모니터링 해서 서버를 재시작 해주는 툴
    nodemon 노드 모니터링
    nodemon 설치 명령어
    -----------------------------------------------
      개발환경에서만 사용할 거니까 -dev붙여주고
      npm install --save-dev nodemon

      터미널 창에서 직접 nodemon을 사용하려면 -g로 설치
      npm install -g nodemon
    -----------------------------------------------
  */

  const URL = req.url;
  switch (URL) {
    case "/":
      res.end("main");
      break;
    case "/list":
      temp.query("SELECT * FROM products", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.end(JSON.stringify(data));
        }
      });
      //res.end("ㅇㅎㅇ");
      break;
    case "/add":
      // VALUES(?,?,?) 이렇게 작성하면 밸류의값을 두번째 배열 타입의 매개변수로 추가할 수 있다.
      //접속할때마다 쿼리문 실행해서 계속 추가됨
      const sql = "INSERT INTO products (name, number, series)VALUES(?,?,?)";
      temp.query(sql, ["이름", "123", "123"]);
      //, () => {
      // 값넘겨주고 추가로 다른페이지로 옮겨줌
      // res.redirect("/list");
      break;
    case "/shop":
      res.end("shop");
      break;
    case "/mypage":
      res.end("mypage");
      break;
    default:
      break;
  }

  req.statusCode = 200;
  console.log(req.url);
  // res.write("123");
  // res.end("456");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("port : " + PORT);
});
