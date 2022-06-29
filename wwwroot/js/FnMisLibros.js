$(document).ready(function () {
    getDataForDatatables();
});

function getDataForDatatables() {
    $.ajax({
        url: 'https://navarrolabs.cl/test/api',
        dataType: "json",
        success: function (response) {
            console.log(response)
            setDataToTable(response);
        },
        error: function () {
            alert("Algo salio masl.. <br> Intentelo denuevo!");
        }
    });
}

function setDataToTable(jsonData) {
    $('#employee').DataTable({
        pagination: "bootstrap",
        filter: true,
        data: jsonData.libros.AllUsers,
        destroy: true,
        lengthMenu: [5, 10, 25],
        pageLength: 10,
        "columns": [
            { data: "titulo" },
            { data: "autor" },
            { data: "cate" }
        ]
    });
}