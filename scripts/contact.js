const disponibilidad = {
    vmt: {
        0: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Miguel" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Alexander" }
        ],
        1: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" }
        ],
        2: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Miguel" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Alexander" }
        ],
        3: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" }
        ],
        4: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Miguel" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Alexander" }
        ],
        5: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Alexander" }
        ],
        6: [
            { inicio: "09:00", fin: "14:00", lic: "Licenciado Pedro" }
        ]
    },
    sjm: {
        0: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" }
        ],
        1: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Alexander" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Miguel" }
        ],
        2: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" }
        ],
        3: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Alexander" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Miguel" }
        ],
        4: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" }
        ],
        5: [
            { inicio: "08:00", fin: "15:00", lic: "Licenciado Alexander" },
            { inicio: "15:00", fin: "22:00", lic: "Licenciado Miguel" }
        ],
        6: []
    }
};

const branch = document.querySelector('#branch');
const date = document.querySelector('#date');
const hour = document.querySelector('#hour');
const section = document.querySelector('#section');

function generarBloques(inicio, fin) {
    const bloques = [];
    const [hInicio, mInicio] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);
    const start = new Date();
    start.setHours(hInicio, mInicio, 0);
    const end = new Date();
    end.setHours(hFin, mFin, 0);
    while (start < end) {
        const horas = start.getHours().toString().padStart(2, '0');
        const minutos = start.getMinutes().toString().padStart(2, '0');
        bloques.push(`${horas}:${minutos}`);
        start.setMinutes(start.getMinutes() + 30);
    }
    return bloques;
}

function actualizarHorarios() {
    hour.innerHTML = '';
    section.value = '';
    const sede = branch.value;
    const fecha = new Date(date.value);
    const dia = fecha.getDay();

    if (!sede || !date.value || !disponibilidad[sede] || !disponibilidad[sede][dia]) {
        const option = document.createElement('option');
        option.textContent = 'No hay atención ese día';
        option.disabled = true;
        hour.appendChild(option);
        return;
    }

    const franjas = disponibilidad[sede][dia];
    franjas.forEach(franja => {
        const bloques = generarBloques(franja.inicio, franja.fin);
        bloques.forEach(horaTexto => {
            const option = document.createElement('option');
            option.value = horaTexto;
            option.textContent = horaTexto;
            option.dataset.licenciado = franja.lic;
            hour.appendChild(option);
        });
    });
}

function asignarLicenciado() {
    const selectedOption = hour.selectedOptions[0];
    section.value = selectedOption?.dataset?.licenciado || 'No disponible';
}

document.addEventListener('DOMContentLoaded', () => {
    branch.addEventListener('change', actualizarHorarios);
    date.addEventListener('change', actualizarHorarios);
    hour.addEventListener('change', asignarLicenciado);

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const phone = document.querySelector('#phone').value;
        const fecha = document.querySelector('#date').value;
        const hora = document.querySelector('#hour').value;
        const sede = branch.options[branch.selectedIndex].textContent;
        const licenciado = section.value;

        if (!name || !phone || !hora || !fecha || !licenciado) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        const mensaje = `Hola Jerjes Mariluz,%0A%0ATu cita ha sido registrada con éxito:%0A📍 Sede: ${sede}%0A📅 Fecha: ${fecha}%0A🕰️ Hora: ${hora}%0A👨‍⚕️ Licenciado: ${licenciado}%0A%0AGracias por confiar en FisioCarrillo.`;
        const telefonoFisio = "51958982907";
        const urlWhatsApp = `https://wa.me/${telefonoFisio}?text=${mensaje}`;

        window.open(urlWhatsApp, '_blank');

        Swal.fire({
            icon: 'success',
            title: '¡Cita registrada con éxito!',
            html: `
                <p><strong>Hola ${name},</strong></p>
                <p>Tu cita fue enviada vía WhatsApp:</p>
                <p>📍 <strong>Sede:</strong> ${sede}</p>
                <p>📅 <strong>Fecha:</strong> ${fecha}</p>
                <p>⏰ <strong>Hora:</strong> ${hora}</p>
                <p>👨‍⚕️ <strong>Licenciado:</strong> ${licenciado}</p>
                <hr>
                <p>✅ Se ha enviado al equipo de FisioCarrillo.</p>
                <p>Si tienes urgencias, comunícate directamente con nosotros.</p>
            `,
            confirmButtonText: 'Entendido'
        });

        e.target.reset();
        hour.innerHTML = '';
        section.value = '';
    });
});
















// let disponibilidad = {};

// async function cargarDisponibilidad() {
//     try {
//         const response = await fetch('/data/disponibilidad.json');
//         if (!response.ok) {
//             throw new Error('No se pudo cargar el archivo disponibilidad.json');
//         }

//         disponibilidad = await response.json();

//     } catch (error) {
//         console.error('Error al cargar disponibilidad', error);
//     }
// }

// const branch = document.querySelector('#branch');
// const date = document.querySelector('#date');
// const hour = document.querySelector('#hour');
// const section = document.querySelector('#section');

// function generarBloques(inicio, fin) {
//     const bloques = [];
//     const [hInicio, mInicio] = inicio.split(':').map(Number);
//     const [hFin, mFin] = fin.split(':').map(Number);

//     const start = new Date();
//     start.setHours(hInicio, mInicio, 0);

//     const end = new Date();
//     end.setHours(hFin, mFin, 0);

//     while (start < end) {
//         const horas = start.getHours().toString().padStart(2, '0');
//         const minutos = start.getMinutes().toString().padStart(2, '0');
//         bloques.push(`${horas}:${minutos}`);
//         start.setMinutes(start.getMinutes() + 30);
//     }
//     return bloques;
// }

// function actualizarHorarios() {
//     hour.innerHTML = '';
//     section.value = '';

//     const sede = branch.value;
//     const fecha = new Date(date.value);
//     const dia = fecha.getDay();

//     if (!sede || !date.value || !disponibilidad[sede] || !disponibilidad[sede][dia]) {
//         const option = document.createElement('option');
//         option.textContent = 'No hay atención ese dia';
//         option.disabled = true;
//         hour.appendChild(option);
//         return;
//     }

//     const franjas = disponibilidad[sede][dia];

//     franjas.forEach( (franja) => {
//         const bloques = generarBloques(franja.inicio, franja.fin);
//         bloques.forEach( (horaTexto) => {
//             const option = document.createElement('option');
//             option.value = horaTexto;
//             option.textContent = horaTexto;
//             option.dataset.licenciado = franja.lic;
//             hour.appendChild(option);
//         });
//     });
// }

// function adignarLicenciado() {
//     const selectedIndex = hour.selectedIndex;
//     if (selectedIndex === -1) {
//         section.value = 'No disponible';
//         return
//     }

//     const selectedOption = hour.options[hour.selectedIndex];
//     section.value = selectedOption?.dataset?.licenciado || 'No disponible';
// }


// function obtenerCorreoLicenciado(nombre) {
//     const correos = {
//         'Licenciado Carlos': 'carlos@ejemplo.com',
//         'Licenciado Pedro': 'pedro@ejemplo.com',
//         'Licenciado Miguel': 'miguel@ejemplo.com',
//         'Licenciado Alexander': 'alexander@ejemplo.com',
//     };
//     return correos[nombre] || 'contacto@fisiocarrillo'; 
// }


// document.addEventListener('DOMContentLoaded', async () => {
//     await cargarDisponibilidad();
//     branch.addEventListener('change', actualizarHorarios);
//     date.addEventListener('change', actualizarHorarios);
//     hour.addEventListener('change', adignarLicenciado);

//     document.querySelector('form').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const selectedIndex = hour.selectedIndex;
//     if (selectedIndex === -1) {
//         alert('Por favor, selecciona una hora válida');
//         return;
//     }

//     const selectedOption = hour.options[selectedIndex];

//     const data = {
//         name: document.querySelector('#name').value,
//         email: document.querySelector('#email').value,
//         fecha: document.querySelector('#date').value,
//         hora: document.querySelector('#hour').value,
//         mensaje: document.querySelector('#message').value,
//         licenciado: document.querySelector('#section').value,
//         sede: branch.options[branch.selectedIndex].textContent,
//         correo_licenciado: obtenerCorreoLicenciado(document.querySelector('#section').value)
//     };

//     try {
//         const res = await fetch('http://localhost:5000/enviar-cita', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await res.json();
//         Swal.fire({
//             icon: 'success',
//             title: '¡Cita registrada con exito!',
//             html: `
//                 <p><strong>Hola ${data.name},</strong></p>
//                 <p>Tu cita ha sido registrada con éxito:</p>
//                 <p>📍 <strong>Sede:</strong> ${data.sede}</p>
//                 <p>📅 <strong>Fecha:</strong> ${data.fecha}</p>
//                 <p>⏰ <strong>Hora:</strong> ${data.hora}</p>
//                 <p>👨‍⚕️ <strong>Licenciado:</strong> ${data.licenciado}</p>
//                 <p>📝 <strong>Motivo:</strong> ${data.mensaje}</p>
//                 <hr>
//                 <p>Gracias por confiar en <strong>FisioCarrillo</strong>.</p>
//             `,
//             confirmButtonText: 'Entendido',
//         })

//         // ✅ Aquí recién se limpia el formulario
//         document.querySelector('form').reset();
//         hour.innerHTML = '';
//         section.value = '';
//     } catch (error) {
//         alert('Error al enviar la cita. Intenta nuevamente.');
//         console.error('Error:', error);
//     }
// });

     

   
// });