$(function(){

    let $title = $('.title');
    let $url = 'http://api.icndb.com/jokes/random';
    let $button = $('.generate');

    function responseHandler(response,element){
        let $joke = $('<h2 class="joke">'+response.value.joke+'</h2>');
        element.after($joke);
    }

    function loadContent(path,responseFunction,element){
        $.ajax({
        	url:path,
        	type:'GET',
        }).done(function(response){
            responseFunction(response,element);
        }).fail(function(error){
        	console.log('Connection error - status: ' + error.statusText);
        });
    }

    loadContent($url,responseHandler,$title);

    $button.on('click',(e)=>{
        $title.next().remove();
        loadContent($url,responseHandler,$title);
    });


});
