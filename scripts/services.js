function displayServices(services) {
    const container = document.querySelector('#services-container');
    services.forEach((service) => {
        const element = document.createElement('div'); // corregido elemet → element
        element.classList.add('cards');
        element.innerHTML = `
            <h3>${service.h3}</h3>
            <img src="${service.img}" alt="${service.h3}" width="250" loading="lazy">
            <p>${service.text}</p>
        `;
        container.appendChild(element); // falta el ; opcional pero recomendable
    });
}

document.addEventListener('DOMContentLoaded', loadServices);

async function loadServices() {
    try{
        const response = await fetch('/data/services.json');
        if (!response.ok) {
            throw new Error('Error al cargar')
        }

        const services = await response.json();
        displayServices(services);
    } catch (error) {
        console.error('Error al cargar')
    }
}