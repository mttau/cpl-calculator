document.getElementById('cpl-form').addEventListener('input', calculateCPL);

function calculateCPL() {
    const billingFrequency = document.getElementById('billing-frequency').value;
    const revenuePerCustomer = parseFloat(document.getElementById('revenue-per-customer').value) || 0;
    const averageMonths = parseInt(document.getElementById('average-months').value) || 0;
    const marketingPercentage = parseFloat(document.getElementById('marketing-percentage').value) || 0;
    const qualificationRate = parseFloat(document.getElementById('qualification-rate').value) || 0;
    const closeRate = parseFloat(document.getElementById('close-rate').value) || 0;

    // Calculate Customer Lifetime Revenue
    let lifetimeRevenue = 0;
    if (billingFrequency === "monthly") {
        lifetimeRevenue = revenuePerCustomer * averageMonths;
    } else if (billingFrequency === "quarterly") {
        lifetimeRevenue = revenuePerCustomer * (averageMonths / 3);
    } else if (billingFrequency === "yearly") {
        lifetimeRevenue = revenuePerCustomer * (averageMonths / 12);
    }

    document.getElementById('customer-lifetime-revenue').textContent = `$${lifetimeRevenue.toFixed(2)}`;

    // Calculate Target Customer Acquisition Cost
    const acquisitionCost = lifetimeRevenue * (marketingPercentage / 100);
    document.getElementById('target-acquisition-cost').textContent = `$${acquisitionCost.toFixed(2)}`;

    // Calculate Target Cost Per Lead (CPL)
    let targetCPL = 0;
    if (qualificationRate > 0 && closeRate > 0) {
        targetCPL = acquisitionCost * (closeRate / 100) / (qualificationRate / 100);
    }
    
    document.getElementById('target-cpl').textContent = `$${targetCPL.toFixed(2)}`;
}
