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
let menus = document.querySelectorAll(".menus button");
let sidemenus = document.querySelectorAll(".side-menu-list button");

menus.forEach((menu)=> menu.addEventListener("click", (event)=>getNewsByTopic(event)));
sidemenus.forEach((sidemenu) => sidemenu.addEventListener("click", (event) => getNewsByTopic(event)));


const openNav = () => {
  document.getElementById("mySidenav").style.width = "300px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area")
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none"
  } else {
    inputArea.style.display = "inline"
  }
};

const getLatestNews = async () => { //비동기 처리, 기존 동기적 언어인 js에서 await을 사용하려면 비동기처리를 선언하는 async를 같이 써주어야 함.
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`
  );
  let header = new Headers({
    'x-api-key': 'G4clsHrkRRsNTe19Gs1UhM3XsKLlkg_8LgqJFAmf5bw'
  });

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


const getNewsByTopic = async (event) => {
  console.log("클릭됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase()
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  let header = new Headers({
      'x-api-key': 'G4clsHrkRRsNTe19Gs1UhM3XsKLlkg_8LgqJFAmf5bw'
  });
  let response = await fetch(url, {
    headers: header
  });
  let data = await response.json();
  news = data.articles
  render()

  console.log(data);
};

const render = () => {
  let resultHTML = '';
  if(news != 'undeined' && news != null){
    resultHTML = news.map((item)=>{

    return `<div class="row news">
            <div class="col-lg-4">
              <img src=${item.media == null || item.media == "" ? "https://www.google.com/url?sa=i&url=http%3A%2F%2Fhanshinchurch.org%2F&psig=AOvVaw0H9YGJZW5XAwkcigA_fUz9&ust=1645287548121000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCLDZr4DUifYCFQAAAAAdAAAAABAD" : item.media} alt="이미지">
            </div>
            <div class="col-lg-8">
              <a href="${item.link}"><h2>${item.title}</h2></a>
              <p>
              ${item.summary == null || item.summary == "" ? "내용없음" : item.summary > 200 ? item.summary.substring(0,200) + "..." : item.summary}
              </p>
              <div>
                <span>출처 -</span> <strong>${item.rights == null || item.rights == "" ? "no source" : item.rights}</strong> <br>
                ${item.published_date || "no source"} <br>
                ${moment(item.published_date).fromNow()}
              </div>
            </div>
          </div>`;

  }).join('');
}

  document.getElementById("news-contents").innerHTML = resultHTML;
}

  /*
  function render() {
    let resultHTML = '';
    for (let i = 0; i < news.length; i++) {
      resultHTML += `<div class="row news">
              <div class="col-lg-4">
                <img src=${news[i].media} alt="이미지">
              </div>
              <div class="col-lg-8">
                <a href="${news[i].link}"><h2>${news[i].title}</h2></a>
                <p>
                ${news[i].summary}
                </p>
                <div>
                  <span>출처</span>${news[i].rights} <br>
                  ${news[i].published_date}
                </div>
              </div>
            </div>`;
    }
    document.getElementById("news-contents").innerHTML = resultHTML;
  }
  */
