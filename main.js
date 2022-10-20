const config1 = {
  parent: '#usersTable',
  columns: [
    { title: 'Имя', value: 'name' },
    { title: 'Фамилия', value: 'surname' },
    { title: 'Возраст', value: 'birthday' },
    { title: 'Avatar', value: 'avatar' },
  ],
  apiUrl: 'https://mock-api.shpp.me/ccc/users',
}

const config2 = {
  parent: '#usersTable',
  columns: [
    { title: 'Name', value: 'name' },
    { title: 'Surname', value: 'surname' },
    { title: 'Age', value: 'birthday' },
    { title: 'Avatar', value: 'avatar' },
  ],
  apiUrl: 'https://mock-api.shpp.me/ipigovych/users',
}

let config = config2

//////////make table//////////////

function DataTable(config) {
  fetch(config.apiUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let tableHtml = `<table id="tableId">
      <thead>
        <tr>
          <th colspan="${
            Object.keys(config.columns).length + 2
          }"><button class="add-user" onclick ="addUser()">Add user</button></th>    
        </tr>      
        <tr>
          <th>№</th>`

      for (let i = 0; i < Object.entries(config.columns).length; i++) {
        tableHtml += `<th>${config.columns[i].title}</th>`
      }

      tableHtml += `<th>Actions</th>
        </tr>
      </thead>
      <tbody>`

      function getYearDiff(date) {
        return Math.abs(new Date().getFullYear() - new Date(date).getFullYear())
      }

      for (var key of Object.entries(data.data)) {
        tableHtml += `<tr>
        <td>${key['0']}</td>
        <td>${key['1'].name}</td>
        <td>${key['1'].surname}</td>
        <td>${getYearDiff(key['1'].birthday)}</td>
        <td><img alt="avatar" src="${key['1'].avatar}"></img></td>
        <td><button class="button-delete" onclick ="deleteUser(${key['0']}, '${
          config.apiUrl
        }')">Delete</button></td>
        </tr>`
      }

      tableHtml += `
        </tbody>
      </table>`

      document.getElementById('usersTable').innerHTML = tableHtml
    })
}


function deleteUser(id, url) {
  fetch(url + '/' + id, {
    method: 'DELETE',
  }).then(() => {
    DataTable(config)
  })
}

function addUser() {

///////////////add new row with inputs//////////////
  const row = document.createElement('tr')
  const td = document.createElement('td')

  td.innerHTML = ''
  row.appendChild(td)

  for (let i = 0; i < Object.entries(config1.columns).length; i++) {
    const td = document.createElement('td')
    const inp = `<div class="input-container"><input class="input" type="text" id="${config.columns[i].value}" name="${config.columns[i].value}" placeholder="${config.columns[i].value}"></div>`
    td.innerHTML = inp
    row.appendChild(td)
  }

  const add = document.createElement('td')
  const buttonAdd = `<button class="add-button">Add</button>`
  add.innerHTML = buttonAdd
  row.appendChild(add)

  document
    .getElementById('tableId')
    .childNodes[3].insertBefore(
      row,
      document.getElementById('tableId').childNodes[3].firstChild
    )

  ////////add user to API/////////////////////

  document.querySelector('.add-button').onclick = function (url) {

    let name = document.querySelector('input[name=name]').value
    let surname = document.querySelector('input[name=surname]').value
    let birthday = document.querySelector('input[name=birthday]').value
    let avatar = document.querySelector('input[name=avatar]').value

    if (name && surname && birthday && avatar) {
      console.log('all ok' + name + ' ' + surname + ' ' + birthday)
      fetch(config.apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          surname: surname,
          avatar: avatar,
          birthday: birthday,
        }),
      }).then((data) => {
        console.log(data)
        DataTable(config)
      })
    } else {
      for (let i = 0; i < Object.entries(config1.columns).length; i++) {
        checkInput(config.columns[i].value)
      }
    }
  }

  function checkInput(inp) {
    console.log('check inp' + inp)
    if (document.querySelector(`input[name=${inp}]`).value === '') {
      document.querySelector(`input[name=${inp}]`).classList.add('red-border')
    } else {
      console.log('value ' + document.querySelector(`input[name=${inp}]`).value)
    }
  }
}

///////run script//////////////////////

DataTable(config)
