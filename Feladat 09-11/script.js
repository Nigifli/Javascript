const container = document.getElementById('joke-container');

    function fetchAndShow(url) {
      container.innerHTML = "<p>⏳ Loading...</p>";
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hálózati hiba!');
          }
          return response.json();
        })
        .then(data => {
          displayJoke(data);
        })
        .catch(error => {
          container.innerHTML = `<p style="color:red;">Hiba: ${error.message}</p>`;
        });
    }

    function displayJoke(data) {
      if (Array.isArray(data)) {
        data = data[0];
      }
      if (data.setup && data.punchline) {
        container.innerHTML = `
          <h3>${data.setup}</h3>
          <p><b>${data.punchline}</b></p>
        `;
      } else if (data.joke) {
        container.innerHTML = `<p>${data.joke}</p>`;
      } else {
        container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      }
    }

    document.getElementById('btn-random')
      .addEventListener('click', () => fetchAndShow('https://official-joke-api.appspot.com/jokes/random'));

    document.getElementById('btn-by-id')
      .addEventListener('click', () => {
        const id = document.getElementById('input-id').value;
        if (id) {
          fetchAndShow(`https://official-joke-api.appspot.com/jokes/${id}`);
        } else {
          container.innerHTML = `<p style="color:orange;">Adj meg egy ID-t!</p>`;
        }
      });

    document.getElementById('btn-by-type')
      .addEventListener('click', () => {
        const type = document.getElementById('select-type').value;
        if (type) {
          fetchAndShow(`https://official-joke-api.appspot.com/jokes/${type}/random`);
        } else {
          container.innerHTML = `<p style="color:orange;">Válassz egy típust!</p>`;
        }
      });