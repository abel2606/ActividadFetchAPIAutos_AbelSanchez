const marcasSelect = document.getElementById('marcas');
const selectContainer = document.getElementById('select-container');
const modeloSelect = document.getElementById('modelos');

fetch('http://localhost:8888/marcas')
.then(response => response.text())
.then(data =>{
    const marcas = data.split('\n');
    marcas.forEach(marca =>{
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        marcasSelect.appendChild(option);

    })

    marcasSelect.addEventListener('change', ()=>{
        const selectedMarca =marcasSelect.value;
        cargarModelos(selectedMarca);
    })


})

function cargarModelos(marca){
    fetch(`http://localhost:8888/modelos/${marca}`)
    .then(response => response.text())
    .then(data =>{
        const modelos = data.split('\n');
        modeloSelect.innerHTML = '<option value="">Seleccione un modelo</option>';
        modelos.forEach(modelo=>{
            const option= document.createElement('option');
            option.value = modelo;
            option.textContent = modelo;

            const marcaSinEspacio = marca.trim();
            option.classList.add(`is-${marcaSinEspacio}`)
        
            modeloSelect.appendChild(option)
        })
    })
}

modeloSelect.addEventListener('change', ()=>{
    const modelo = modeloSelect.value;
    if(modelo){
        alert(`Modelo seleccionado: ${modelo}`)
    }
})