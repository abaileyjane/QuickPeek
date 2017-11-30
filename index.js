const IMAGE_SEARCH_URL= ''
const NYTIMES_SEARCH_URL="https://api.nytimes.com/svc/search/v2/articlesearch.json"

function getDataFromNYTimesApi(searchTerm, callback){
	const query = {
		'api-key': "8ff7ddb75a014ca2ba370fd62077e980",
  		'q': `${searchTerm}`
};
$.getJSON(NYTIMES_SEARCH_URL, query, callback);
}

function displayTimesArticles(data){
	console.log(data, "displayTimesArticles ran");
	const results = data.response.docs.map((item,index)=> renderTimesResult(item));
	$('.new-york-times-results').html(results);
}	

function renderTimesResult(result){
	console.log("renderTimesResult ran")
	return `
	<article>
		<a href="${result.web_url}">
			<img class="thumbnail" src="${result.multimedia.url}">
			<h2>${result.headline.main}</h2>
		</a>
		<h3>${result.snippet}</h3>
		`
}

//function getDataFromGoogleImageApi(searchTerm, callback){
//	console.log("getDataFromGoogleImageApi ran");
//	const query = {
//		searchType = "image",
//		part: 'snippet',
//		q: `${searchTerm}`,
//		key: 'AIzaSyCctJU2Yz0r1F6LdJUdC92s5BXEws0lFP8'
//		per_page: 20
//	};
//	$.getJSON()
//	}
//}

function displayGoogleImage(){

}
function watchSubmit(){
	$(".submit-button").click(event=>{
		console.log("watchSubmit ran");
		event.preventDefault();
		const query = $(".keyword").val();
		console.log(query);
		getDataFromNYTimesApi(query, displayTimesArticles)

	})
}

function link(){
	console.log("this is linked");
}

$(link);

$(watchSubmit);