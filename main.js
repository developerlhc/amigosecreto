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

    const participantes = [...nombres];
    const asignaciones = {};
    const asignados = new Set(); // Usamos un Set para trackear quién ya ha sido asignado

    for (let i = 0; i < numParticipantes; i++) {
        let amigoSecretoIndex;
        do {
            amigoSecretoIndex = Math.floor(Math.random() * numParticipantes);
        } while (amigoSecretoIndex === i || asignados.has(participantes[amigoSecretoIndex])); // Verificamos si ya fue asignado

        asignaciones[participantes[i]] = participantes[amigoSecretoIndex];
        asignados.add(participantes[amigoSecretoIndex]); // Marcamos como asignado
    }

    // Verificación de ciclos. Si hay un ciclo, se vuelve a sortear.
    if (detectarCiclos(asignaciones)){
        return sortear();//recursividad para volver a generar un sorteo
    }

    asignacionesDiv.innerHTML = "";

    for (const persona in asignaciones) {
        const asignacion = document.createElement('div');
        asignacion.textContent = `${persona} le regala a ${asignaciones[persona]}`;
        asignacionesDiv.appendChild(asignacion);
    }
    resultadosDiv.style.display = "block";
}

function detectarCiclos(asignaciones) {
  const personas = Object.keys(asignaciones);
  for (const persona of personas) {
      let siguiente = asignaciones[persona];
      let recorrido = [persona];

      while (siguiente !== undefined && !recorrido.includes(siguiente)) {
          recorrido.push(siguiente);
          siguiente = asignaciones[siguiente];
      }
      if (siguiente === persona) {
          return true; // Se detectó un ciclo
      }
  }
  return false; // No se detectaron ciclos
}


function reiniciar() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.style.display = "none";
    const nombresInput = document.getElementById('nombres');
    nombresInput.value = "";
}