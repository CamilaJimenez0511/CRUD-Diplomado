let ingresar = document.getElementById('ingresar');
let resultado = document.getElementById('resultado');
let codigo = document.getElementById('codigo');
let producto = document.getElementById('producto');
let precio = document.getElementById('precio');
let cantidad = document.getElementById('cantidad');
let idp = document.getElementById('idp');
let buscar = document.getElementById('buscar');

ListarProductos();

function ListarProductos(busqueda) {
    const url = '../control/listar.php';
    fetch(url, {
        method: 'POST',
        body: busqueda
    }).then(response => response.text()).then(response => {
        resultado.innerHTML = response;
    })
}

ingresar.addEventListener('click', (e)=>{
    e.preventDefault();
    let data = new FormData(document.getElementById('frm'));
    const url = '../control/ingresar.php';
    fetch(url,{
        method: 'POST',
        body: data
    }).then(response => response.text()).then(response => {
        if(response == 'ok'){
            Swal.fire({
                icon: 'success',
                title: 'Registrado',
                showConfirmButton: false,
                timer: 1500
            })
            document.getElementById('frm').reset();
            ListarProductos();
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Modificado',
                showConfirmButton: false,
                timer: 1500
            })
            ingresar.value = "Ingresar";
            idp.value = "";
            document.getElementById('frm').reset();
            ListarProductos();
        }
    })
});

function Eliminar(id){
    Swal.fire({
        title: '¿Esta seguro de eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = '../control/eliminar.php';
            fetch(url,{
                method: 'POST',
                body: id
            }).then(response => response.text()).then(response =>{
                if(response == 'ok'){
                    ListarProductos();
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    })
}

function Editar(id){
    const url = '../control/editar.php';
    fetch(url,{
        method: 'POST',
        body: id
    }).then(response => response.json()).then(response =>{
        idp.value = response.id;
        codigo.value = response.codigo;
        producto.value = response.producto;
        precio.value = response.precio;
        cantidad.value = response.cantidad;
        ingresar.value = "Actualizar";
    })
}

buscar.addEventListener("keyup", ()=>{
    const valor = buscar.value;
    if (valor == ""){
        ListarProductos();
    }else{
        ListarProductos(valor);
    }
})