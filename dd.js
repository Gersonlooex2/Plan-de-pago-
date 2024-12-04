function calcularFechaAnterior(fecha) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(0);
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

    for (let i = 1; i <= term; i++) {
        const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
        let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

        const interest = (initialBalance * interestRate * daysBetween) / 30;
        let insurance = initialBalance * insuranceRate;
        insurance = Math.max(insurance, 2);

        const totalPayment = monthlyPayment + interest + insurance;
        const newBalance = initialBalance - monthlyPayment;

        const row = amortizationTable.insertRow();
        row.innerHTML = `
            <td>${i}</td>
            <td>${currentDate.toLocaleDateString('es-NI')}</td>
            <td>${daysBetween}</td>
            <td>${initialBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
            <td>${monthlyPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
            <td>${insurance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
            <td>${interest.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
            <td>${totalPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
            <td>${newBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' })}</td>
        `;

        initialBalance = newBalance;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
}
