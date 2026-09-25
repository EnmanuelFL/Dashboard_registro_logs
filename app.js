const lang = navigator.language;
const params =  new URLSearchParams(window.location.search);
const id_uuid = crypto.randomUUID();
const fecha = () => new Date().toLocaleDateString("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

function estado_conexion(){
    if (navigator.onLine){
        console.log(true);
    }
    else {
        console.log(false)
    }
}