﻿//Google api key:AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4
$(document).ready(function () {
    var item, tile, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "Key=AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4";
    var placeHldr = 'https://ctuid.com/img/not-found.png';
    var searchData = ["Fiction", "Literary+Criticism", "Photography", "Artistic", "Social+Science", "Law", "Classic", "Comic", "Crime", "Fantasy", "Graphic novel", "Historical fiction", "Horror", "Mystery", "Paranormal romance",
        "Science", "Computers", "Java ", "Technology & Engineering", "Young Adult Fiction", "Comics & Graphic Novels", "Juvenile Fiction", " Literary Collections", ]



    $("#descubrir").click(function () {
        console.log("descubrirSelect")
        outputList.innerHTML = "";
        buscar = $("#descubrirSelect").val();
        if (buscar == "aleatorio") {
            buscar = getRandomItem(searchData)
        }
        document.body.style.backgroundImage = "url"
        // console.log(searchData);
        // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData+subject, getBookData()});
        $.ajax({
            url: bookUrl + getRandomItem(buscar),
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response.totalItems === 0) {
                    alert("Sin resultado!.. Intente de nuevo")
                }
                else {
                    $("#title").animate({ 'margin-top': '5px' }, 1000); //search box animation
                    $(".book-list").css("visibility", "visible");
                    displayResults(response);
                }
            },
            error: function () {
                alert("Algo salio masl.. <br>" + " Intentelo denuevo!");
            }
        });
    });
    /*
  * function to display result in index.html
  * @param response
  */
    function displayResults(response) {
      for (var i = 0; i < response.items.length; i+=1) {
	try{ 
        item = response.items[i];
        id = response.items.id;
        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publisher1 = item.volumeInfo.publisher;
        descrip = item.volumeInfo.description;
        bookLink1 = item.volumeInfo.previewLink;
        catego = item.volumeInfo.categories; 
        bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr; // mostrara placeHldr si no hay img 
        // in production code, item.text should have the HTML entities escaped.
        outputList.innerHTML += '<div class="row mt-4">' +
            formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn, catego, id) +
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
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsb, cate, id) {
        // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
        var viewUrl = 'book.html?isbn=' + bookIsbn; //constructing link for bookviewer
        var htmlCard = `<div class="col-lg-6 ">
       <div class="card my-5 rounded " style="">
         <div class="row no-gutters ">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8 ">
             <div class="card-body ">
               <h5 class="card-title text-dark">${title}</h5>
               <p class="card-text text-dark">Autor: ${author}</p>
               <p class="card-text  text-dark">Editorial: ${publisher}</p>
                <p class="card-text  text-dark">Categoria: ${cate} </p>
                <p>
                    <select class="form-select" aria-label="Default select example">
                      <option value="0" selected>Selecionar...</option>
                      <option value="1">Quiero Leer</option>
                      <option value="2">Leyendo</option>
                      <option value="3">Leido</option>
                    </select>
                </p>
                <p>
                    <button class="btn btn-success" style="float:right" onclick="javascript:fncGuardar('${title}', '${author}', '${publisher}', '${cate}', this,'${bookImg}')">Guardar</button>
                </p>
             </div>
           </div>
         </div>
       </div>
     </div>`
        return htmlCard;
    }
});


//handling error for empty search box
function displayError() {
    alert("El campo no puede estar vacio!")
}

function fncGuardar(titulo, autor, publisher, categoria, boton, portada) {

    if ($(boton).parent().parent().find('select').val() == '0') {
        alert('Se debe seleccionar un estado del libro');
        return;
    }
    var data = { Title: titulo, Author: autor, Publisher: publisher, Cate: categoria, Estado: $(boton).parent().find('select').val() ,Portada: portada }

    $.ajax({
        url: '/Home/GuardarLibro',
        data: data,
        method: 'POST',
        success: function (resp) {

        },
        success: function (a, b, c) {

        },
    });

}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}