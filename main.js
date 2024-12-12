function sortear() {
    const nombresInput = document.getElementById('nombres');
    const resultadosDiv = document.getElementById('resultados');
    const asignacionesDiv = document.getElementById('asignaciones');

    const nombres = nombresInput.value.split(',').map(nombre => nombre.trim()).filter(nombre => nombre !== "");
    const numParticipantes = nombres.length;

    if (numParticipantes < 2) {
        alert("Ingresa al menos dos nombres.");
        return;
    }

    const participantes = [...nombres]; // Clonamos el array para no modificar el original
    const asignaciones = {};

    for (let i = 0; i < numParticipantes; i++) {
        let amigoSecretoIndex;
        do {
            amigoSecretoIndex = Math.floor(Math.random() * numParticipantes);
        } while (amigoSecretoIndex === i || asignaciones[participantes[i]] === participantes[amigoSecretoIndex]);

        asignaciones[participantes[i]] = participantes[amigoSecretoIndex];

    }

    asignacionesDiv.innerHTML = ""; // Limpiamos resultados anteriores

    for (const persona in asignaciones) {
       const asignacion = document.createElement('div');
        asignacion.textContent = `${persona} le regala a ${asignaciones[persona]}`;
        asignacionesDiv.appendChild(asignacion);
    }
    resultadosDiv.style.display = "block";
}

function reiniciar(){
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.style.display="none";
    const nombresInput = document.getElementById('nombres');
    nombresInput.value = "";
}