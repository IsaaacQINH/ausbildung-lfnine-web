fetch('/api/db')
    .then(response => response.json())
    .then(data => {
        data.forEach((ele) => {
            addTicket(ele.id, ele.title, ele.description, new Date(ele.submission_date).toDateString());
        });
    });

function addTicket(id, title, description, date) {
    const table = document.getElementById("open-tickets")
    const row = document.createElement("div");
    row.classList.add("table-row");

    const column_id = document.createElement("div");
    const column_title = document.createElement("div");
    const column_description = document.createElement("div");
    const column_date = document.createElement("div");

    column_id.classList.add("table-column", "id");
    column_title.classList.add("table-column", "title");
    column_description.classList.add("table-column", "description");
    column_date.classList.add("table-column", "date");

    column_id.innerText = id;
    column_title.innerText = title;
    column_description.innerText = description;
    column_date.innerText = date;

    row.appendChild(column_id);
    row.appendChild(column_title);
    row.appendChild(column_description);
    row.appendChild(column_date);
    table.appendChild(row);
}

async function deleteAll() {
    const rawResponse = await fetch('/api/db/delete', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    window.location.href = '/';
}

async function postTicket() {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    }
    const rawResponse = await fetch('/api/db', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  window.location.href = '/';
}