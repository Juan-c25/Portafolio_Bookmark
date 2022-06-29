var apicrud = 'https://navarrolabs.cl/test/api'
//Google api key:AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4
$(document).ready(function () {
    var item, tile, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "Key=AIzaSyDcoLxcFGM6uiIgYdYe_HqO7EblZ2gkcI4";
    var placeHldr = 'https://ctuid.com/img/not-found.png';
    var searchData;


    //listener para boton buscar 
    $(document).ready(function () {
        outputList.innerHTML = "";
        document.body.style.backgroundImage = "url('')";

        // console.log(searchData);
        // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
        $.ajax({
            url: apicrud + '?metodo=read&' + usuariID,
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response.totalItems === 0) {
                    alert("Sin resultado!.. Intente de nuevo")
                }
                else {
                    $("#title").animate({ 'margin-top': '5px' }, 1000); //search box animation
                    $(".book-list").css("visibility", "visible");
                    mostrarResultado(response);
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
    function mostrarResultado(response) {
        for (var i = 0; i < response.items.length; i += 1) {
            try {
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
            } catch (e) {
                console.log('Error indice: ' + i)
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
        var htmlCard = `<div class="col-lg-6"> 

       <div class="card" style="">

         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title text-dark">${title}</h5>
               <p class="card-text text-dark">Autor: ${author}</p>
               <p class="card-text text-dark">Editorial: ${publisher}</p>
                <p class="card-text text-dark">Categoria: ${cate} </p>
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
function putLibrofnc(libroid, estado) {
    var data = {
        usuario: usuariID,
        libro: libroid,
        estado: estado,
        metodo: 'update'
    }

    $.ajax({
        url: apicrud,
        data: data,
        method: 'POST',
        success: function (resp) {
        },
        success: function (a, b, c) {

        },
    });
}

function deleteLibrofnc(libroid) {
    var data = {
        usuario: usuariID,
        libro: libroid,
        metodo: 'delete'
    }

    $.ajax({
        url: apicrud,
        data: data,
        method: 'POST',
        success: function (resp) {
        },
        success: function (a, b, c) {

        },
    });
}

