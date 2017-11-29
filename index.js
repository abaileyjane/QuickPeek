function watchSubmit(){
	$(".submit-button").click(event=>{
		console.log("watchSubmit ran");
		event.preventDefault();
		const query = $(".keyword").val();
		console.log(query);

	})
}

function link(){
	console.log("this is linked");
}

$(link);

$(watchSubmit);