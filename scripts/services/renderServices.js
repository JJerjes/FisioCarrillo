export function renderServices(services, containerId = 'services-container') {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        console.error(`No se encontro el contenedor con ID: ${containerId}`);
        return;
    }
    
    container.innerHTML = '';
    services.forEach((service) => {
        const element = document.createElement('div'); 
        element.classList.add('cards');
        element.innerHTML = `
            <h3>${service.h3}</h3>
            <img src="${service.img}" alt="${service.h3}" width="250" loading="lazy">
            <p>${service.text}</p>
        `;
        container.appendChild(element);
    });
}
