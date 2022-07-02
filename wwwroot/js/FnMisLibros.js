$(document).ready(function () {
    getDataForDatatables();

});

function getDataForDatatables() {
    $.ajax({
        url: 'https://navarrolabs.cl/test/api',
        dataType: "json",
        success: function (response) {
            setDataToTable(response.libros.AllUsers);
        },
        error: function () {
            alert("Algo salio masl.. <br> Intentelo denuevo!");
        }
    });
}


function setDataToTable(datos) {
    var d = '<tbody>';
    for (var iteam of datos) {
        select = ""
        tipoEstado = ['Quiero Leer', 'Leyendo', 'Leido']
        select = `<select size="1" class="form-select" id="row-${iteam.id_libro}" name="row-${iteam.id_libro}">`
        for (var i = 0; i <= tipoEstado.length; i++) {
            if (iteam.estado == 1 + i) {
                select += `<option value='${iteam.estado}' selected>${tipoEstado[i]}</option>`
            } else {
                if (i <= 2) {
                    select += `<option value='${1 + i}'>${tipoEstado[i]}</option>`
                }
            }
        }
        select += "</select>"
        d += '<tr>' +
            '<td>' + iteam.titulo + '</td>' +
            '<td>' + iteam.autor + '</td>' +
            '<td>' + iteam.cate + '</td><td>' + select +
            '</td><td>' + `<img src="${iteam.portada}" alt= "${iteam.titulo}" height="55" width= "30">` + '</td>' +
            `<td>
 <button type="button" id="row-${iteam.id_libro}" class="btn btn-warning" onclick="btn_Editar('row-${iteam.id_libro}')">Editar</button>
 <button type="button" id="row-${iteam.id_libro}" class="btn btn-danger" onclick="btn_Eliminar(${iteam.id_libro})">Eliminar</button> 
 </td> 
</tr>`;
    }
    d += `</tbody><tfoot>
    <tr>
        <th>Titulo</th>
        <th>Autor</th>
        <th>Categoria</th>
        <th>Estado</th>
        <th>Portada</th>
        <th>Botones</th>
    </tr>
</tfoot>`
    $("#tabla").append(d);
    formatoTable();
};

function formatoTable() {
    var table = $('#tabla').DataTable({
        "language": {
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar:",
            "infoThousands": ",",
            "loadingRecords": "Cargando...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad",
                "collection": "Colección",
                "colvisRestore": "Restaurar visibilidad",
                "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                "copySuccess": {
                    "1": "Copiada 1 fila al portapapeles",
                    "_": "Copiadas %d fila al portapapeles"
                },
                "copyTitle": "Copiar al portapapeles",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Mostrar todas las filas",
                    "1": "Mostrar 1 fila",
                    "_": "Mostrar %d filas"
                },
                "pdf": "PDF",
                "print": "Imprimir"
            },
            "autoFill": {
                "cancel": "Cancelar",
                "fill": "Rellene todas las celdas con <i>%d<\/i>",
                "fillHorizontal": "Rellenar celdas horizontalmente",
                "fillVertical": "Rellenar celdas verticalmentemente"
            },
            "decimal": ",",
            "searchBuilder": {
                "add": "Añadir condición",
                "button": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "clearAll": "Borrar todo",
                "condition": "Condición",
                "conditions": {
                    "date": {
                        "after": "Despues",
                        "before": "Antes",
                        "between": "Entre",
                        "empty": "Vacío",
                        "equals": "Igual a",
                        "notBetween": "No entre",
                        "notEmpty": "No Vacio",
                        "not": "Diferente de"
                    },
                    "number": {
                        "between": "Entre",
                        "empty": "Vacio",
                        "equals": "Igual a",
                        "gt": "Mayor a",
                        "gte": "Mayor o igual a",
                        "lt": "Menor que",
                        "lte": "Menor o igual que",
                        "notBetween": "No entre",
                        "notEmpty": "No vacío",
                        "not": "Diferente de"
                    },
                    "string": {
                        "contains": "Contiene",
                        "empty": "Vacío",
                        "endsWith": "Termina en",
                        "equals": "Igual a",
                        "notEmpty": "No Vacio",
                        "startsWith": "Empieza con",
                        "not": "Diferente de"
                    },
                    "array": {
                        "not": "Diferente de",
                        "equals": "Igual",
                        "empty": "Vacío",
                        "contains": "Contiene",
                        "notEmpty": "No Vacío",
                        "without": "Sin"
                    }
                },
                "data": "Data",
                "deleteTitle": "Eliminar regla de filtrado",
                "leftTitle": "Criterios anulados",
                "logicAnd": "Y",
                "logicOr": "O",
                "rightTitle": "Criterios de sangría",
                "title": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "value": "Valor"
            },
            "searchPanes": {
                "clearMessage": "Borrar todo",
                "collapse": {
                    "0": "Paneles de búsqueda",
                    "_": "Paneles de búsqueda (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Sin paneles de búsqueda",
                "loadMessage": "Cargando paneles de búsqueda",
                "title": "Filtros Activos - %d"
            },
            "select": {
                "1": "%d fila seleccionada",
                "_": "%d filas seleccionadas",
                "cells": {
                    "1": "1 celda seleccionada",
                    "_": "$d celdas seleccionadas"
                },
                "columns": {
                    "1": "1 columna seleccionada",
                    "_": "%d columnas seleccionadas"
                }
            },
            "thousands": ".",
            "datetime": {
                "previous": "Anterior",
                "next": "Proximo",
                "hours": "Horas",
                "minutes": "Minutos",
                "seconds": "Segundos",
                "unknown": "-",
                "amPm": [
                    "am",
                    "pm"
                ]
            },
            "editor": {
                "close": "Cerrar",
                "create": {
                    "button": "Nuevo",
                    "title": "Crear Nuevo Registro",
                    "submit": "Crear"
                },
                "edit": {
                    "button": "Editar",
                    "title": "Editar Registro",
                    "submit": "Actualizar"
                },
                "remove": {
                    "button": "Eliminar",
                    "title": "Eliminar Registro",
                    "submit": "Eliminar",
                    "confirm": {
                        "_": "¿Está seguro que desea eliminar %d filas?",
                        "1": "¿Está seguro que desea eliminar 1 fila?"
                    }
                },
                "error": {
                    "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                },
                "multi": {
                    "title": "Múltiples Valores",
                    "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                    "restore": "Deshacer Cambios",
                    "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                }
            },
            "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
        },
        columnDefs: [
            {
                orderable: false,
                targets: [1, 2, 3],
            }
        ],
    });
};


function btn_Eliminar(id_libro) {
    var data = {
        id_libro: id_libro
    }
    $.ajax({
        url: 'https://navarrolabs.cl/test/eliminar',
        data: data,
        method: 'GET',
        success: function (resp) {
        },
        success: function (a, b, c) {
        },
    });
    setTimeout(function () {
        location.reload(true);
    }, 3000);
}

function btn_Editar(id_libro) {
    var est = document.getElementById(id_libro).value;
    var data = {
        id_libro: id_libro.replace('row-', ''),
        estado: est
    }
    $.ajax({
        url: 'https://navarrolabs.cl/test/modificar',
        data: data,
        method: 'GET',
        success: function (resp) {
        },
        success: function (a, b, c) {
        },
    });
    setTimeout(function () {
    location.reload(true);
    }, 3000);
}