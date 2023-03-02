const ul = document.querySelector('ul');
const pre = document.querySelector('pre');
const button = document.querySelector('button');
let clients;

const loadClients = async()=> {
  const response = await fetch('/api/clients');
  clients = await response.json();
  renderClientsList(clients);
  loadDetails();
};

const renderClientsList = (clients)=> {
  const id = window.location.hash.slice(1);
  const html = clients.map( client => {
    return `
      <li class='${ id === client.id ? 'selected': ''}'>
        <a href='#${client.id}'>
          ${ client.name }
        </a>
        <button data-id='${client.id}'>x</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
};

loadClients();

const loadDetails = async()=> {
  const id = window.location.hash.slice(1);
  if(id){
    const response = await fetch(`/api/clients/${id}`);
    if(response.ok){
      const client = await response.json();
      pre.innerText = JSON.stringify(client, null, 2);
    }
  }
  else {
    pre.innerText = '';
  }
  renderClientsList(clients);
};

window.addEventListener('hashchange', loadDetails);

button.addEventListener('click', async()=> {
  const response = await fetch('/api/clients', {
    method: 'POST',
    body: JSON.stringify({ name: Math.round(Math.random() * 1000)}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const client = await response.json();
  clients.push(client);
  renderClientsList(clients);
  window.location.hash = client.id;
});

ul.addEventListener('click', async(ev)=> {
  if(ev.target.tagName === 'BUTTON'){
    const id = ev.target.getAttribute('data-id');
    await fetch(`/api/clients/${id}`, {
      method: 'DELETE'
    });
    clients = clients.filter(client => client.id !== id);
    renderClientsList(clients);
  }
});
