//1. url 준비
//2. 헤더준비
//3. 백엔드 서버에 요청
//4. 데이터를 보여줌.
//const callAPI = async() =>{
//  let url = new URL(`url주소`)
//let header = new Headers({헤더내용}) // 이건 필요한 경우만
//let response = await fetch(url,{headers:header})
//let data = await response.json()
//}

let news = [];

const openNav = () => {
  document.getElementById("mySidenav").style.width = "300px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area")
  if(inputArea.style.display === "inline") {
    inputArea.style.display = "none"
  } else {
    inputArea.style.display ="inline"
  }
};

const getLatestNews = async () => { //비동기 처리, 기존 동기적 언어인 js에서 await을 사용하려면 비동기처리를 선언하는 async를 같이 써주어야 함.
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  let header = new Headers({
    'x-api-key': 'G4clsHrkRRsNTe19Gs1UhM3XsKLlkg_8LgqJFAmf5bw'
  })

  let response = await fetch(url, {
    headers: header
  }) //ajax, http, fetch
  let data = await response.json()
  console.log(response)
  news = data.articles
  console.log(news)

  render();
};

getLatestNews();

function render(){
  let resultHTML='';
  for(let i=0; i<news.length; i++){
    resultHTML += `<div class="row news">
            <div class="col-lg-4">
              <img src=${news[i].media} alt="이미지">
            </div>
            <div class="col-lg-8">
              <a href="${news[i].link}"><h2>${news[i].title}</h2></a>
              <p>
              ${news[i].summary}
              </p>
              <div class="">
                ${news[i].clean_url}
              </div>
            </div>
          </div>`;
  }
  document.getElementById("news-contents").innerHTML = resultHTML;
}
