function DataTable(config) {
  console.log(config)
  let configStringified = JSON.stringify(config)
  console.log(configStringified)
  let configParsed = JSON.parse(configStringified)
  console.log(configParsed)
  fetch(config.apiUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)

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
          <th colspan="${Object.keys(config.columns).length + 2}"><button class="add-user" onclick ="addUser()">Add user</button></th>    
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
        <td><button class="button-delete" onclick ="deleteUser(${key['0']}, '${config.apiUrl}')">Delete</button></td>
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
    { title: 'Возраст', value: 'age' },
    { title: 'Avatar', value: 'avatar' },
  ],
  apiUrl: 'https://mock-api.shpp.me/ccc/users',
}

const config2 = {
  parent: '#usersTable',
  columns: [
    { title: 'Name', value: 'name' },
    { title: 'Surname', value: 'surname' },
    { title: 'Age', value: 'age' },
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
  let table = document.getElementById("tableId");
  console.log(table)
}

DataTable(config1)
