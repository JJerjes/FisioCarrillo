export function iniciarContacto() {
  const disponibilidad = {
    vmt: {
      0: [
        { inicio: "08:00", fin: "15:00", lic: "Licenciado Miguel" }, 
        { inicio: "15:00", fin: "22:00", lic: "Licenciado Alexander" } 
        ],
      1: [
        { inicio: "08:00", fin: "15:00", lic: "Licenciado Carlos" }, 
      {  inicio: "15:00", fin: "22:00", lic: "Licenciado Pedro" } 
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

    const branchEl = document.querySelector('#branch');
    const dateEl = document.querySelector('#date');
    const hourEl = document.querySelector('#hour');
    const sectionEl = document.querySelector('#section');

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
        hourEl.innerHTML = '';
        sectionEl.value = '';
        const sede = branchEl.value;
        const fecha = new Date(dateEl.value);
        const dia = fecha.getDay();

        if (!sede || !dateEl.value || !disponibilidad[sede] || !disponibilidad[sede][dia]) {
            const option = document.createElement('option');
            option.textContent = 'No hay atención ese día';
            option.disabled = true;
            hourEl.appendChild(option);
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
                hourEl.appendChild(option);
            });
        });
    }

    function asignarLicenciado() {
        const selectedIndex = hourEl.selectedIndex;
        if (selectedIndex === -1) {
            sectionEl.value = 'No disponible';
            return;
        }
        const selectedOption = hourEl.options[selectedIndex];
        sectionEl.value = selectedOption?.dataset?.licenciado || 'No disponible';
    }

    if (!branchEl || !dateEl || !hourEl || !sectionEl) {
        console.warn('No se encontraron elementos del formulario para inicializar');
        return;
    }

    branchEl.addEventListener('change', actualizarHorarios);
    dateEl.addEventListener('change', actualizarHorarios);
    hourEl.addEventListener('change', asignarLicenciado);

    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const fecha = dateEl.value;
        const hora = hourEl.value;
        const sede = branchEl.options[branchEl.selectedIndex].textContent;
        const licenciado = sectionEl.value;

        if (!hora || !fecha || !licenciado || !name || !phone) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        const mensajeTexto = `Hola ${name},

Tu cita ha sido registrada con éxito:
📍 Sede: ${sede}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
👨‍⚕️ Licenciado: ${licenciado}

Gracias por confiar en FisioCarrillo.`;

        const mensaje = encodeURIComponent(mensajeTexto);
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

        form.reset();
        hourEl.innerHTML = '';
        sectionEl.value = '';
    });
}
