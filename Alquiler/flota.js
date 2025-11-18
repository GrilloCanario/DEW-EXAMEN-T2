const milisegundosEnUnDia = 1000*60*60*24;

function diaSiguiente(fecha) {
    fecha.setDate(fecha.getDate()+1);
    return fecha;
}

function fechaToStr(fecha) {
    return fecha.toISOString().split('T')[0];   
}

function diffDias(fecha1, fecha2) {
    let milisegundos = fecha2.getTime() - fecha1.getTime();
    let dias = Math.ceil(milisegundos / milisegundosEnUnDia);
    return dias;
}

const FLOTA = {
    'economico': {
        'min_edad': 21,
        'coches': [
            { 'id': 'eco-seat', 'nombre': 'Seat Ibiza', 'precio_dia': 50 },
            { 'id': 'eco-renault', 'nombre': 'Renault Clio', 'precio_dia': 55 },
            { 'id': 'eco-opel', 'nombre': 'Opel Corsa', 'precio_dia': 52 }
        ]
    },
    'suv': {
        'min_edad': 25,
        'coches': [
            { 'id': 'suv-nissan', 'nombre': 'Nissan Qashqai', 'precio_dia': 80 },
            { 'id': 'suv-peugeot', 'nombre': 'Peugeot 3008', 'precio_dia': 85 }
        ]
    },
    'premium': {
        'min_edad': 30,
        'coches': [
            { 'id': 'pre-mercedes', 'nombre': 'Mercedes Clase C', 'precio_dia': 120 },
            { 'id': 'pre-bmw', 'nombre': 'BMW Serie 3', 'precio_dia': 125 },
            { 'id': 'pre-audi', 'nombre': 'Audi A4', 'precio_dia': 122 }
        ]
    },
    'furgoneta': {
        'min_edad': 25,
        'coches': [
            { 'id': 'furgo-berlingo', 'nombre': 'Citroen Berlingo', 'precio_dia': 70 },
            { 'id': 'furgo-transporter', 'nombre': 'VW Transporter', 'precio_dia': 90 }
        ]
    }
};

