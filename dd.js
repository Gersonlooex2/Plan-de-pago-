function calcularFechaAnterior(fecha) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
    if (nuevaFecha > fecha) {
        nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
    }
    return nuevaFecha;
}

function calculateAmortization() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    const insuranceRate = parseFloat(document.getElementById("insuranceRate").value) / 100;
    const disbursementDate = new Date(document.getElementById("disbursementDate").value);
    const firstPaymentDate = new Date(document.getElementById("firstPaymentDate").value);
    const term = parseInt(document.getElementById("term").value);

    const amortizationTable = document.getElementById("amortizationTable").querySelector("tbody");
    amortizationTable.innerHTML = "";

    const monthlyPayment = amount / term;
    let initialBalance = amount;
    let currentDate = new Date(firstPaymentDate);

    let totalInterest = 0;
    let totalInsurance = 0;
    let totalPayments = 0;

    for (let i = 1; i <= term; i++) {
        const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
        let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

        const interest = (initialBalance * interestRate * daysBetween) / 30;
        let insurance = initialBalance * insuranceRate;
        if (insurance < 2) insurance = 2;

        const totalPayment = monthlyPayment + interest + insurance;
        const newBalance = initialBalance - monthlyPayment;

        // Acumular totales
        totalInterest += interest;
        totalInsurance += insurance;
        totalPayments += totalPayment;

        // Agregar fila a la tabla
        const row = amortizationTable.insertRow();
        row.insertCell().textContent = i;
        row.insertCell().textContent = currentDate.toLocaleDateString('es-NI');
        row.insertCell().textContent = daysBetween;
        row.insertCell().textContent = initialBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
        row.insertCell().textContent = monthlyPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
        row.insertCell().textContent = insurance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
        row.insertCell().textContent = interest.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
        row.insertCell().textContent = totalPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
        row.insertCell().textContent = newBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });

        initialBalance = newBalance;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Agregar fila de totales
    const totalRow = amortizationTable.insertRow();
    totalRow.insertCell().textContent = "Totales";
    totalRow.insertCell().colSpan = 4;
    totalRow.insertCell().textContent = ""; // Espacio vacío
    totalRow.insertCell().textContent = totalInsurance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    totalRow.insertCell().textContent = totalInterest.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    totalRow.insertCell().textContent = totalPayments.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    totalRow.insertCell().textContent = ""; // Espacio vacío
}
