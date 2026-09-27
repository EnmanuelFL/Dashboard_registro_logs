    const lang = navigator.language;
    const params =  new URLSearchParams(window.location.search);
    const id_uuid = crypto.randomUUID();
    let card_dashboard = document.querySelector(".card-dashboard")
    const button_añadir_log = document.querySelector("#btn-guardar")
    const input_log = document.querySelector("#input-log")
    const card_historial = document.querySelector(".card-historial");

    const fecha = () => new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Funcion que devuelve el estado de conexion del navegador
    function estado_conexion(){
        return navigator.onLine ? "Conectado" : "Desconectado";
}
    // Funcion para renderizar la pagina 
    function renderizado_pagina(){
        const pLang = document.createElement("p");
        pLang.textContent = `Idioma: ${lang}`;
        const pId_UUID = document.createElement("p");
        pId_UUID.textContent = `Id: ${id_uuid}`;
        const pEstado_Conexion = document.createElement("p");
        pEstado_Conexion.textContent = `Estado: ${estado_conexion()}`;
        const pFecha = document.createElement("p");
        pFecha.textContent = `Fecha: ${fecha()}`;
        const pModo = document.createElement("p");
        pModo.textContent = `Modo: ${params.get('modo') || 'estándar'}`;

        card_dashboard.appendChild(pLang);
        card_dashboard.appendChild(pEstado_Conexion);
        card_dashboard.appendChild(pFecha);
        card_dashboard.appendChild(pId_UUID);
        card_dashboard.appendChild(pModo);
}

    let logs = [];

// Funcion para guardar en LocalStorage
    function guardarEnLocalStorage() {
    try {
        localStorage.setItem("historial_logs", JSON.stringify(logs));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
}

// Funcion para cargar desde LocalStorage
    function cargarFromLocalStorage() {
    try {
        const datos_guardados = localStorage.getItem("historial_logs");
        if (datos_guardados) {
            logs = JSON.parse(datos_guardados);
        }
    } catch (error) {
        console.error("Error al cargar de localStorage:", error);
        logs = [];
    }
}

// Esto sirve para añadir logs q
    button_añadir_log.addEventListener('click', function(){
        const texto = input_log.value.trim();
        if (!texto) return;
        const nuevoLog = {
        id: crypto.randomUUID(),
        mensaje: texto,
        fecha: fecha(),
        sesionId: id_uuid
};
    logs.push(nuevoLog);
    guardarEnLocalStorage();
    renderizar_historial();
    input_log.value = "";

});

// FUncion para renderizar el historial
function renderizar_historial() {
    card_historial.innerHTML = "";
    logs.forEach(log => {
        const contenedorLog = document.createElement("div");
        contenedorLog.classList.add("item-log");
        const pMensaje = document.createElement("p");
        pMensaje.textContent = `Evento: ${log.mensaje}`;
        const smallDetalles = document.createElement("small");
        smallDetalles.textContent = `${log.fecha} | Sesión: ${log.sesionId}`;

        contenedorLog.appendChild(pMensaje);
        contenedorLog.appendChild(smallDetalles);
        card_historial.appendChild(contenedorLog);
    });
}

renderizado_pagina();
cargarFromLocalStorage();
renderizar_historial();