    const lang = navigator.language;
    const params =  new URLSearchParams(window.location.search);
    const id_uuid = crypto.randomUUID();
    let card_dashboard = document.querySelector(".card-dashboard")

    const fecha = () => new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
    });

  function estado_conexion(){
    return navigator.onLine ? "Conectado" : "Desconectado";
}

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