// 1. SAVE SUBMISSION (Runs on index.html when form is submitted)
const commissionForm = document.querySelector('form'); // Adjust selector if you have a specific form class/id
if (commissionForm) {
    commissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capture data from your form fields
        const clientName = document.querySelector('input[type="text"]').value || "Anonymous";
        const buildType = document.querySelector('select')?.value || "Custom Figure";
        
        const newOrder = {
            client: clientName,
            type: buildType,
            status: "Pending Approval"
        };
        
        // Get existing orders or start an empty list
        let orders = JSON.parse(localStorage.getItem('studio_orders')) || [];
        orders.push(newOrder);
        
        // Save back to local storage
        localStorage.setItem('studio_orders', JSON.stringify(orders));
        
        alert("Submission saved successfully!");
        commissionForm.reset();
    });
}

// 2. LOAD SUBMISSIONS (Runs on dashboard.html)
if (document.querySelector('.orders-table')) {
    document.addEventListener('DOMContentLoaded', function() {
        const tbody = document.querySelector('.orders-table tbody');
        let orders = JSON.parse(localStorage.getItem('studio_orders')) || [];
        
        // Clear placeholder row if real data exists
        if (orders.length > 0) {
            tbody.innerHTML = ''; 
            
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${order.client}</strong></td>
                    <td>${order.type}</td>
                    <td><span class="status-badge progress">${order.status}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
    });
}
