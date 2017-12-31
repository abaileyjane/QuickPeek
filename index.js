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
	if (data.response.results.length===0){
		$('.guardian-section-heading').html('<h2>The Guardian</h2>')
		$('.guardian-results').html("");
		$('.guardian-results').append(`<h3>No results found</h3>`);
	}
	else{
		const results = data.response.results.map((item,index)=> renderGuardianResult(item));
		$('.guardian-section-heading').html('<h2>The Guardian</h2>')
		$('.guardian-results').html("");
		$('.guardian-results').append(results);
	}
}	

function renderGuardianResult(result){
	console.log("renderGuardianResult ran")
	try{ return `
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

		`}
	catch(err){
		console.log("We are in the CATCH log for guardian"+err);
		return('')
	}
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
		'<div class="row" style="background-color:#FF9B85; height:100px; border-bottom: black dashed 4px">'+
			'<div class="col-4">'+
				'<h1>QuickPeek</h1>'+
			'</div>'+
			'<div class="4-col" style="margin-top:25px; float:right; margin-right:10vw">'+
				'<form action="#" class="search-form" label="Search for news">'+
					'<input style="height:50px; width:33vw; font-size:30px; border:#60d394 solid 4px; border-radius:5px; font-family:"barlow Semi Condensed", sans-serif;" class="keyword" type="text" placeholder="Search for news...">'+
						'<button class="submit-button" type="submit" style="font-family: "Barlow Semi Condensed", sans-serif; background-color:#FFD97D; height:45px; width:60px; border:#60d394 solid 4px; border-radius:5px">PEEK!</button>'+
				'</form>'+
			'</div>'+
		'</div>'+

		'<div class="row hide" style="">' +
			
				'<img id="large-image" src=""/>'+
		
		'</div>'+
		'<div class="row hide">'+
		'<div class="col-12" style="">'+
			
				'<ul class="slides"></ul>'+
		'</div></div>')
		;
	try{
		for (let i=0; i<10; i++){
		const imageUrl= data.items[i].pagemap.cse_image[0].src;
			$('.slides').append(`<li class="slide" ><span class="col-1"><img class="thumbnail" src="${imageUrl}"/></span></li>`)}
		$('#large-image').attr('src', data.items[0].pagemap.cse_image[0].src);
	}
	catch(err){
		console.log("there is an error in google image"+err);
			watchImageClick();
	watchSubmit();
		return('')
	}
	watchImageClick();
	watchSubmit();
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
	if (data.response.docs.length===0){
		$('.ny-section-heading').html('<h2>The New York Times</h2>');
		$('.new-york-times-results').html("");
		$('.new-york-times-results').append(`<h3>No results found.</h3>`);
		}
	else{
		const results = data.response.docs.map((item,index)=> renderTimesResult(item));
		$('.ny-section-heading').html('<h2>The New York Times</h2>');
		$('.new-york-times-results').html("");
		$('.new-york-times-results').append(results);	
		}
	}
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
		console.log("We are in the CATCH log for nt times"+err)
		return('')
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

