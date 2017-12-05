const IMAGE_SEARCH_URL= 'https://www.googleapis.com/customsearch/v1?'
const NYTIMES_SEARCH_URL="https://api.nytimes.com/svc/search/v2/articlesearch.json"
const TWITTER_SEARCH_URL="https://api.twitter.com/1.1/search/tweets.json"
const GUARDIAN_SEARCH_URL ="https://content.guardianapis.com/search"

function getDataFromGuardianApi(searchTerm, callback){
	const query = {
		'api-key': "1b040e7b-1d37-430c-8009-215bb9516578",
		'format': 'json',
		'show-fields': 'thumbnail',
  		'q': `${searchTerm}`
};
$.getJSON(GUARDIAN_SEARCH_URL, query, callback);
}

function displayGuardianArticles(data){
	console.log(data, "displayGuardianArticles ran");
	const results = data.response.results.map((item,index)=> renderGuardianResult(item));
	$('.guardian-results').append(results);
}	

function renderGuardianResult(result){
	console.log("renderGuardianResult ran")
	return `
	<article>
		<a href="${result.webUrl}">
		<img src="${result.fields.thumbnail}">
			<h2>${result.webTitle}</h2>
		</a>

		`
}

function getDataFromGoogleImageApi(searchTerm, callback){
	const query = {
		'key': "AIzaSyA1WspdRy5p3ax5ZbbQKaOB-eDI34H-NPI",
		'cx': '008250477201985305049:2mep0j_l_ee',
  		'q': `${searchTerm}`
};
$.getJSON(IMAGE_SEARCH_URL, query, callback);
}

function displayGoogleImage(data){
	console.log(data, "displayGoogleImage ran");
	const results = data.items.map((item,index)=> renderGoogleImage(item));
	$('.google-image-results').append(results);
}	

function renderGoogleImage(items){
	console.log("renderGoogleImage ran")
	return `
	<article>
		<a href="${items.link}">
		<img src="${items.pagemap.cse_image[0].src}">
			<h2>${items.title}</h2>
			<h3>${items.snippet}</h3>
		</a>

		`
}

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
	$('.new-york-times-results').append(results);
}	

function renderTimesResult(result){
	console.log("renderTimesResult ran")
	return `
	<article>
		<a href="${result.web_url}">
			<img class="thumbnail" src="http://www.nytimes.com/${result.multimedia[2].url}">
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

function watchSubmit(){
	$(".submit-button").click(event=>{
		console.log("watchSubmit ran");
		event.preventDefault();
		const query = $(".keyword").val();
		console.log(query);
		getDataFromNYTimesApi(query, displayTimesArticles);
		getDataFromGuardianApi(query, displayGuardianArticles);
		getDataFromGoogleImageApi(query, displayGoogleImage);


	})
}

function link(){
	console.log("this is linked");
}

$(link);

$(watchSubmit);