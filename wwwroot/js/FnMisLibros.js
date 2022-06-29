$(document).ready(function () {
    getDataForDatatables();
});

function getDataForDatatables() {

    var jsonData = {
        "libros": {
            "AllUsers": [
                {
                    "id_libro": "1",
                    "titulo": "Hackear al hacker",
                    "autor": "Roger A. Grimes",
                    "publisher": "Marcombo",
                    "cate": "Business & Economics",
                    "estado": "1",
                    "portada": "http://books.google.com/books/content?id=wktOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                    "id_usuario": "5b6451eb-6ef9-449d-8f10-5ff00627ef20"
                },
                {
                    "id_libro": "2",
                    "titulo": "EIR (Enfermero interno residente)",
                    "autor": "José Manuel Ania Palacio",
                    "publisher": "MAD-Eduforma",
                    "cate": "Education",
                    "estado": "1",
                    "portada": "http://books.google.com/books/content?id=TXQ0k57YWRwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                    "id_usuario": "488a3529-30f1-4009-83e7-5382c3518670"
                },
                {
                    "id_libro": "3",
                    "titulo": "Harry Potter Y El Misterio del Príncipe / Harry Potter and the Half-Blood Prince",
                    "autor": "J. K. Rowling",
                    "publisher": "Salamandra Infantil Y Juvenil",
                    "cate": "Juvenile Fiction",
                    "estado": "1",
                    "portada": "http://books.google.com/books/content?id=z2hczgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                    "id_usuario": "5b6451eb-6ef9-449d-8f10-5ff00627ef20"
                },
                {
                    "id_libro": "4",
                    "titulo": "F.G. Paci",
                    "autor": "Joseph Pivato",
                    "publisher": "Guernica Editions",
                    "cate": "Literary Criticism",
                    "estado": "1",
                    "portada": "http://books.google.com/books/content?id=z-98rVTmFmsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                    "id_usuario": "2cd4fb65-0f8b-4203-919f-8c804433a537"
                },
                {
                    "id_libro": "5",
                    "titulo": "Art is Dead",
                    "autor": "Thomas Ridgewell",
                    "publisher": "Hachette UK",
                    "cate": "Humor",
                    "estado": "2",
                    "portada": "http://books.google.com/books/content?id=iy5DCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                    "id_usuario": "2cd4fb65-0f8b-4203-919f-8c804433a537"
                }
            ]
        }
    };

    setDataToTable(jsonData);
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