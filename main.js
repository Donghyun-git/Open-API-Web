//1. url 준비
//2. 헤더준비
//3. 백엔드 서버에 요청
//4. 데이터를 보여줌.

const getLatestNews =()=>{
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  let header = new Headers({'x-api-key':'G4clsHrkRRsNTe19Gs1UhM3XsKLlkg_8LgqJFAmf5bw'})

  let response = fetch(url,{headers:header})
};

getLatestNews();
