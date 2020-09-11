const side = document.getElementById('side');

const app = document.getElementById('root');
const url = 'https://bsaletest.ddns.net/';

//const logo = document.createElement('img');
//logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'container');

//app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', url+'api/productos-venta/lista', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {

    data.lista_categorias.forEach(lista_categorias => {

	const check = document.createElement('input');
	check.type = "checkbox";
	check.name = "category";
	check.value = lista_categorias.id;
	check.id = lista_categorias.id;
	check.setAttribute('class', 'check_categoria');
	
	var label = document.createElement('label')
	label.htmlFor = lista_categorias.id;
	label.appendChild(document.createTextNode(lista_categorias.nombre));
	
	const br = document.createElement('br');
	side.appendChild(check);
	side.appendChild(label);
	side.appendChild(br);

   });
	
    llenarLista(data);

   
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `it's not working!`;
    app.appendChild(errorMessage);
  }
}


document.getElementsByClassName('check_categoria').onchange = function() {
console.log('cont');
   getCategorias();
};

request.send();



/*     eventos de búsqueda      */


/*document.getElementsByClassName('check_categoria').onclick = function() {
    // access properties using this keyword
   alert();
     if ( this.checked ) {
         // if checked ...
          alert( this.value );
     } else {
        // if not checked ...
     }
  };*/


    document.getElementsByClassName('check_categoria').onchange = function() {
	console.log('cont');
   	getCategorias();
    };

    function getCategorias(){

	var checkboxes = document.getElementsByClassName("check_categoria");
	var cont = 0;
	var array = [];

	for (var x=0; x < checkboxes.length; x++) {
 		if (checkboxes[x].checked) {
  			cont = cont + 1;
			array.push(checkboxes[x].value);
 		}
	}

	var http = new XMLHttpRequest();
	var uri = url+'api/productos-venta/categoria?categorias='+array;
	http.open('POST', uri, true);

	//enviar los encabezados a la petición para csrf
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	//http.setRequestHeader('x-csrf-token', 'csrfToken');       
  	http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  	http.setRequestHeader("Accept", "application/json");

	http.onreadystatechange = function() {//llamara a al estado de la petición.
    		if(http.readyState == 4 && http.status == 200) {
        		console.log(http.responseText);
    		}
	}
	http.send();

	document.getElementById('container').innerHTML = '';

	http.onload = function () {
	var data = JSON.parse(this.response);

   	llenarLista(data);

   }

   }


    document.getElementById('buscar').onchange = function() {

	console.log(this.value);
        var palabra = this.value;
   
	var http = new XMLHttpRequest();
	var uri = url+'api/productos-venta/buscar?palabra='+palabra;
	http.open('POST', url, true);

	//enviar los encabezados a la petición para csrf
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	//http.setRequestHeader('x-csrf-token', 'csrfToken');       
  	http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  	http.setRequestHeader("Accept", "application/json");

	http.onreadystatechange = function() {//llamara a al estado de la petición.
    		if(http.readyState == 4 && http.status == 200) {
        		console.log(http.responseText);
    		}
	}
	http.send();

	http.onload = function () {

  	// Begin accessing JSON data here
 	 var data = JSON.parse(this.response);

       llenarLista(data);

   }}



function llenarLista(data){

    document.getElementById('container').innerHTML = '';

    data.lista.forEach(lista => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = '$ '+lista.precio;

      const img = document.createElement('img');
      img.src= lista.url_image;
      img.alt = 'image';
      img.width = 220;
      img.height = 220;

      const p = document.createElement('p');
      lista.nombre = lista.nombre.substring(0, 1500);
      p.textContent = `${lista.nombre}`;

      container.appendChild(card);
      card.appendChild(img);  
      card.appendChild(p);
      card.appendChild(h1);

    });

}









