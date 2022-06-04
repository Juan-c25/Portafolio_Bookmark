//Google api key:AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4
$(document).ready(function () {
    var item, tile, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "Key=AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4";
    var placeHldr = 'https://ctuid.com/img/not-found.png';
    var searchData;


    //listener para boton buscar 
    $("#search").click(function () {
        outputList.innerHTML = "";
        document.body.style.backgroundImage = "url('')";
        searchData = $("#search-box").val();
        if (searchData === "" || searchData === null) {
            displayError();
        }
        else {
            // console.log(searchData);
            // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    if (response.totalItems === 0) {
                        alert("no result!.. try again")
                    }
                    else {
                        $("#title").animate({ 'margin-top': '5px' }, 1000); //search box animation
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function () {
                    alert("Something went wrong.. <br>" + "Try again!");
                }
            });
        }
        $("#search-box").val(""); //clearn search box
    });
    /*
  * function to display result in index.html
  * @param response
  */
    function displayResults(response) {
      for (var i = 0; i < response.items.length; i+=1) {
	try{
        item = response.items[i];
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publisher1 = item.volumeInfo.publisher;
        bookLink1 = item.volumeInfo.previewLink;
        bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr; // mostrara placeHldr si no hay img 
        // in production code, item.text should have the HTML entities escaped.
        outputList.innerHTML += '<div class="row mt-4">' +
                                formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
                                '</div>';
	}catch(e){
	    console.log('Error indice: '+i)
	}
        console.log(outputList);
      }

    }

    /*
    * card element formatter using es6 backticks and templates (indivial card)
    * @param bookImg title author publisher bookLink
    * @return htmlCard
    */
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
        // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
        var viewUrl = 'book.html?isbn=' + bookIsbn; //constructing link for bookviewer
        var htmlCard = `<div class="col-lg-6">
       <div class="card" style="">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Author: ${author}</p>
               <p class="card-text">Publisher: ${publisher}</p>
               <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
             </div>
           </div>
         </div>
       </div>
     </div>`
        return htmlCard;
    }

    //handling error for empty search box
    function displayError() {
        alert("search term can not be empty!")
    }
});