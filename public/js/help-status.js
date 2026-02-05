// Example response (later replace with API call)
let requestData = {
  status: "In-Progress",
  updatedAt: "2 minutes ago"
};

const statusCard = document.getElementById("statusCard");

function updateStatusUI(data) {
  let title = "";
  let message = "";
  let statusClass = data.status;

  switch (data.status) {
    case "Pending":
      title = "🟡 REQUEST RECEIVED";
      message = "Authorities are reviewing your request.";
      break;

    case "Approved":
      title = "🔵 REQUEST APPROVED";
      message = "Help will be assigned shortly.";
      break;

    case "In-Progress":
      title = "🟠 HELP IS ON THE WAY";
      message = "Rescue team is travelling to your location.";
      break;

    case "Completed":
      title = "🟢 HELP DELIVERED";
      message = "Assistance has been successfully provided.";
      break;

    case "Rejected":
      title = "🔴 REQUEST NOT ACCEPTED";
      message = "Please contact emergency support.";
      break;

    default:
      title = "⚪ STATUS UNKNOWN";
      message = "Please refresh the page.";
  }

  // Reset + apply new class
  statusCard.className = `status-card ${statusClass}`;

  statusCard.innerHTML = `
    ${title}
    <div class="message">
      ${message}
      <br><br>
      ⏱ Last updated: ${data.updatedAt}
    </div>
  `;
}

// Initial load
updateStatusUI(requestData);
