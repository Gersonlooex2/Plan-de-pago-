function calcularFechaAnterior(fecha) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
  if (nuevaFecha > fecha) {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
  }
  return nuevaFecha;
}

function calculateAmortization() {
  // ... (obtener valores del formulario y validar campos) ...

  // Inicializar tabla y variables
  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";
  let monthlyPayment = amount / term;
  let initialBalance = amount; // Saldo inicial igual al monto del préstamo
  let currentDate = new Date(firstPaymentDate);

  // Generar tabla de amortización
  for (let i = 1; i <= term; i++) {
    const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
    let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));
    if (i === 1) {
      daysBetween = days; // Usar días del formulario para el primer pago
    }

    // Calcular el interés mensual
    const interest = (initialBalance * interestRate * daysBetween) / 30; // Fórmula corregida para interés diario

    // ... (calcular seguro, totalPayment, newBalance) ...

    // ... (agregar fila a la tabla) ...

    initialBalance = newBalance; // Actualizar saldo inicial para la siguiente fila
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}

// ... (event listener para calcular los días automáticamente) ...
