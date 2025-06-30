import { fetchServices } from "./services/fetchServices.js";
import { renderServices } from "./services/renderServices.js";
import { iniciarMenu } from "./ui/menu.js";
import { iniciarContacto } from "./contacto/contact.js";

document.addEventListener('DOMContentLoaded', async () => {
    iniciarMenu();

    if (document.querySelector('#services-container')) {
        const services = await fetchServices();
        renderServices(services);
    }

    if (document.querySelector('#contact-form')) {
        iniciarContacto();
    }

    
})