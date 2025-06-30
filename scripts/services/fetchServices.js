export async function fetchServices( url = 'data/services.json') {
    try{
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se puedieron cargar los servicios');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        return [];
    }
}