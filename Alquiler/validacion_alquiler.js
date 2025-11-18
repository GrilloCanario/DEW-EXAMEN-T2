const selectTipoCategoria = document.getElementById('categoria');
const alquilerFom = document.getElementById('alquilerForm');

Object.keys(FLOTA).forEach(flota =>{
    const option = document.createElement('option');
    option.value = flota;
    option.textContent = flota;
    selectTipoCategoria.append(option);
});
