function DataTable(config) {
  console.log(config)
  let configStringified = JSON.stringify(config)
  console.log('configStringified' + configStringified)
  let configParsed = JSON.parse(configStringified)
  console.log(configParsed)
  fetch(config.apiUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      console.log(
        '(data.data)[0]' + JSON.stringify(Object.entries(data.data)[0])
      )

      // console.log(Object.keys(data))
      // console.log(Object.keys(data.data))
      // console.log(Object.keys(data.data["1"]))
      // console.log(Object.values(data.data["1"]))
      // console.log(data.data)
      // console.log(data.data['1'])
      // console.log(data.data['1'].name)
      // console.log(Object.keys(data.data["1"]["name"]))
      // console.log(Object.values(data.data["1"].name))
      // console.log(Object.keys(data))
      // console.log(Object.values(data))
      // console.log(Object.values(data.data))
      //  console.log(Object.keys(data.data))
      // console.log(Object.entries(data))
      //  console.log(Object.entries(data.data))
      //   console.log("(data.data)[0]"+Object.keys(data.data)[0])
      //   for (let key in data.data) {
      //     console.log(key)
      //   }
      //   for (const [key, value] of Object.entries(data.data)) {
      //     console.log(`${key}: ${value}`);
      //   }
      //  console.log(Object.keys(data.data.1.name);
      // let peopleCount = Object.keys(data.data).length
      // console.log(peopleCount)

      let tableHtml = `<table id="tableId">
      <thead>
        <tr>
          <th colspan="${
            Object.keys(config.columns).length + 2
          }"><button class="add-user" onclick ="addUser()">Add user</button></th>    
        </tr>      
        <tr>
          <th>№</th>
          <th>${config.columns[0].title}</th>
          <th>${config.columns[1].title}</th>
          <th>${config.columns[2].title}</th>
          <th>${config.columns[3].title}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>`

      function getYearDiff(date) {
        return Math.abs(new Date().getFullYear() - new Date(date).getFullYear())
      }

      for (var key of Object.entries(data.data)) {
        //  console.log(key)
        tableHtml += `<tr>
        <td>${key['0']}</td>
        <td>${key['1'].name}</td>
        <td>${key['1'].surname}</td>
        <td>${getYearDiff(key['1'].birthday)}</td>
        <td><img src="${key['1'].avatar}"></img></td>
        <td><button class="button-delete" onclick ="deleteUser(${key['0']}, '${
          config.apiUrl
        }')">Delete</button></td>
        </tr>`
      }

      tableHtml += `
        </tbody>
      </table>`

      // console.log(tableHtml)
      document.getElementById('usersTable').innerHTML = tableHtml
    })
}

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

// function deleteUser(id, url) {
//   fetch('https://mock-api.shpp.me/ccc/users/' + id, {
//     method: 'DELETE',
//   }).then(() => {
//     console.log(id + 'deleted')
//     DataTable(config1)
//   })
// }

function deleteUser(id, url) {
  //console.log(config)
  fetch(url + '/' + id, {
    method: 'DELETE',
  }).then(() => {
    console.log(id + 'deleted')
    DataTable(config1)
  })
}

function addUser() {
  let table = document.getElementById('tableId')

  console.log(document.getElementById('tableId').childNodes[3].firstChild)
  //  console.log(table.firstChild.innerHTML)

  const row = document.createElement('tr')
  const td = document.createElement('td')
  const inp = `<input type="text" id="id" name="id" placeholder="id">`
  td.innerHTML = inp
  row.appendChild(td)

  for (let i = 0; i < Object.entries(config1.columns).length; i++) {
    const td = document.createElement('td')
    const inp = `<div class="input-container"><input class="input" type="text" id="${config1.columns[i].value}" name="${config1.columns[i].value}" placeholder="${config1.columns[i].value}"></div>`
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

  function anon(ev) {
    console.log('buttonAdd.onclick')
    let id = document.querySelector('input[name=id]').value
    let name = document.querySelector('input[name=name]').value
    let surname = document.querySelector('input[name=surname]').value
    let birthday = document.querySelector('input[name=birthday]').value
    let avatar = document.querySelector('input[name=avatar]').value

    console.log(id + ' ' + name + ' ' + surname + ' ' + birthday)

    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.parse('13', {
          name: 'Sabrina',
          surname: 'Raynor',
          avatar:
            'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1097.jpg',
          birthday: '2022-01-25T03:29:03.866Z',
        }), // body data type must match "Content-Type" header
      })
      return response.json() // parses JSON response into native JavaScript objects
    }

    postData(config1.apiUrl, {
      id: id,
      name: name,
      surname: surname,
      birthday: birthday,
      avatar: avatar,
    }).then((data) => {
      console.log(data) // JSON data parsed by `data.json()` call
    })
  }

  document.querySelector('.add-button').onclick = function (url) {
    console.log('add-button.onclick')

    let id = document.querySelector('input[name=id]').value
    let name = document.querySelector('input[name=name]').value
    let surname = document.querySelector('input[name=surname]').value
    let birthday = document.querySelector('input[name=birthday]').value
    let avatar = document.querySelector('input[name=avatar]').value

    if (id && name && surname && birthday && avatar) {
      console.log('all ok' + id + ' ' + name + ' ' + surname + ' ' + birthday)
    } else {
      checkInput("id") 
      for (let i = 0; i < Object.entries(config1.columns).length; i++) { 
        console.log(config1.columns[i].value)
        checkInput(config1.columns[i].value) 
      }

      //  if (id === '') {
      //   document.querySelector('input[name=id]').classList.add("red-border")
      // }
      // if (name === '') {
      //   document.querySelector('input[name=name]').classList.add("red-border")
      // }
      // if (surname === '') {
      //   document.querySelector('input[name=surname]').classList.add("red-border")
      // }
      // if (birthday === '') {
      //   document.querySelector('input[name=birthday]').classList.add("red-border")
      // }
      // if (avatar === '') {
      //   document.querySelector('input[name=avatar]').classList.add("red-border")
      // }
    }

    fetch('https://mock-api.shpp.me/ccc/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Sabrina',
        surname: 'Raynor',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1097.jpg',
        birthday: '2022-01-25T03:29:03.866Z',
      }),
    }).then((data) => {
      console.log(data)
    })
  }

  function checkInput(inp) {
    console.log('check inp'+inp)
    if (document.querySelector(`input[name=${inp}]`).value === '') {
      document.querySelector(`input[name=${inp}]`).classList.add("red-border")
    } else {
      console.log('value '+document.querySelector(`input[name=${inp}]`).value)
    }
  }

}

DataTable(config1)
