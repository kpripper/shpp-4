function DataTable(config) {
  fetch(config.apiUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      console.log(Object.keys(data))
      console.log(Object.keys(data.data))      
      console.log(Object.keys(data.data["1"]))
      console.log(Object.keys(data.data["1"].name))
      console.log(Object.keys(data.data["1"]))

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
      let peopleCount = Object.values(data.data).length
    //   console.log(data)
    //   console.log(data.data)
    //   let dataData = data.data
    //   console.log("dataData")
    //   console.log(dataData)
    //   console.log(dataData.1)


      let tableHtml = `<table>
      <thead>
          <tr>
              <th>№</th>
              <th>${config.columns[0].title}</th>
              <th>${config.columns[1].title}</th>
              <th>${config.columns[2].title}</th>
          </tr>
      </thead>
      <tbody>`

      for (let i = 0; i < peopleCount.length; i++) {
        tableHtml += `<tr>
           <td>${i + 1}</td>
            <td>${data.data[`${i}`].name}</td>
            <td>${data.data[`${i}`].surname}</td>
           <td>${data.data[`${i}`].age}</td>
        </tr>`
      }

      tableHtml += `
      </tbody>
    </table>`

      console.log(tableHtml)
      document.getElementById('usersTable').innerHTML = tableHtml
    })
}

const config1 = {
  parent: '#usersTable',
  columns: [
    { title: 'Имя', value: 'name' },
    { title: 'Фамилия', value: 'surname' },
    { title: 'Возраст', value: 'age' },
  ],
  apiUrl: 'https://mock-api.shpp.me/ccc/users',
}

const config2 = {
  parent: '#usersTable',
  columns: [
    { title: 'Name', value: 'name' },
    { title: 'Surname', value: 'surname' },
    { title: 'Age', value: 'age' },
    //   { title: 'Avatar', value: 'age' },
  ],
  apiUrl: 'https://mock-api.shpp.me/ipigovych/users',
}

DataTable(config1)
