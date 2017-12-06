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
	$('.guardian-section-heading').html('<h2>The Guardian</h2>')
	$('.guardian-results').append(results);
}	

function renderGuardianResult(result){
	console.log("renderGuardianResult ran")
	return `
	<article>
		<a href="${result.webUrl}">
		<img src="${result.fields.thumbnail}">
			<h3>${result.webTitle}</h3>
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
	$('.main-search-page').html(
		'<div class="row">' +
			'<div class="large-image col-6">'+
			'</div>'+
		'</div>'+
		'<div class="row">'+
		'<div class="col-12">'+
			
				'<ul class="slides"></ul>'+
		'</div></div>)');
	for (let i=0; i<10; i++){
		const imageUrl= data.items[i].pagemap.cse_image[0].src;
			$('.slides').append(`<li class=" slide" ><span class="col-1"><img src="${imageUrl}"/></span></li>`)}
}

//function renderGoogleImage(imageUrl){
	//return `<li class="slide col-1" ><img src="${imageUrl}"/></li>`
//}

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
	$('.ny-section-heading').html('<h2>The New York Times</h2>');
	$('.new-york-times-results').append(results);}	

function renderTimesResult(result){
	console.log("renderTimesResult ran")
	return `
	<article>
		<a href="${result.web_url}">
			<img class="thumbnail" src="http://www.nytimes.com/${result.multimedia[2].url}">
			<h3>${result.headline.main}</h3>
		</a>
		<p>${result.snippet}</p>
		`
}


function watchSubmit(){
	$(".submit-button").click(event=>{
		console.log("watchSubmit ran");
		event.preventDefault();
		const query = $(".keyword").val();
		console.log(query);
		getDataFromNYTimesApi(query, displayTimesArticles);
		getDataFromGuardianApi(query, displayGuardianArticles);
		getDataFromGoogleImageApi(query, displayGoogleImage);
		watchImageClick();
	})
}

function watchImageClick(){
	$(".slide").on('click', function(event){
		event.preventDefault();
		const thumbnailUrl= $(this).find('img').attr('src');
		console.log('the click registered!! this is the URL', thumbnailUrl)
		$('.large-image').attr('src', thumbnailUrl);
	})
}


$(watchSubmit);
$(watchImageClick);
//$('#slider .slides').animate({margin-left -=720}, 1000);
