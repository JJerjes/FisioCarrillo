function displayServices(service) {
    const container = document.querySelector('#services-container');
    service.forEach( (service) => {
        const element = document.createElement('div');
        element.classList.add('service');
        element.innerHTML = `
            <h3>${service.h3}</h3>
            <img src="${service.img}" alt="${service.h3}">
            <p>${service.text}</p>
        `;
        container.appendChild(element)
    });
}

document.addEventListener('DOMContentLoaded', loadServices);

async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) {
            throw new Error('Error al cargar')
        }

        const service = await response.json();
        displayServices(service);
    } catch (error) {
        console.error('Error al cargar')
    }
}