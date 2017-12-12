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
	<article class="guardian-article">
		<div class="row">
			<div class="col-6">
				<img src="${result.fields.thumbnail}">
			</div>

			<div class="col-6">
				<a href="${result.webUrl}">
					<h3>${result.webTitle}</h3>
				</a>
			</div>
		</div>
	</article>

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
		'<div class="row" style="text-align: center">' +
			
				'<img id="large-image" src=""/>'+
		
		'</div>'+
		'<div class="row">'+
		'<div class="col-12" style="">'+
			
				'<ul class="slides"></ul>'+
		'</div></div>')
		;
	for (let i=0; i<10; i++){
		const imageUrl= data.items[i].pagemap.cse_image[0].src;
			$('.slides').append(`<li class="slide" ><span class="col-1"><img class="thumbnail" src="${imageUrl}"/></span></li>`)}
	$('#large-image').attr('src', data.items[0].pagemap.cse_image[0].src);
	watchImageClick();
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
	$('.ny-section-heading').html('<h2>The New York Times</h2>');
	$('.new-york-times-results').append(results);}	

function renderTimesResult(result){
	console.log("renderTimesResult ran")
	try {
		return `
	<article class="nyTimesArticle">
		<div class="row">
			<div class="col-12" style="text-align:right">
				<a href="${result.web_url}">
					<h3>${result.headline.main}</h3>
				</a>
			</div>
		</div>

		<div class="row">
			<div class="col-6"
				<a href="${result.web_url}">
					<img class="thumbnail" src="http://www.nytimes.com/${result.multimedia[2].url}">
				</a>
			</div>
			<div class="col-6">
				<p>${result.snippet}</p>
			</div>
		</div>
	</article>
		`
	}

	catch(err) {
		return('<h3> No results found</h3>')
	}
}



function watchSubmit(){
	$(".submit-button").click(event=>{
		console.log("watchSubmit ran");
		event.preventDefault();
		const query = $(".keyword").val();
		console.log(query);
		$(".main").prop('hidden', false);
		getDataFromNYTimesApi(query, displayTimesArticles);
		getDataFromGuardianApi(query, displayGuardianArticles);
		getDataFromGoogleImageApi(query, displayGoogleImage);
		$('.search-term-container').html(`<h1> ${query} </h1>`)
		
	})
}

function watchImageClick(){
	console.log('watchImageClick ran');
	$(".thumbnail").on('click', function(event){
		event.preventDefault();
		const thumbnailUrl= $(this).attr('src');
		console.log('the click registered!! this is the URL', thumbnailUrl);
		$('#large-image').attr('src', thumbnailUrl);
	})
}


$(document).ready(watchSubmit)
