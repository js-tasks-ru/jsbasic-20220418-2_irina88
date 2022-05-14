/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) { 
    this.elem = this.createTable(rows);
  }

  createTable(rows) {
    let mainTable = document.createElement('table');
    mainTable.innerHTML = `
    <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `;
    let elTbody = document.createElement('tbody');
    rows.forEach(person => {
      elTbody.innerHTML += this.returnRow(person);
    });

    mainTable.append(elTbody);

    mainTable.addEventListener('click', (el)=>{
      if (el.target.classList == 'btn') {
        this.deleteRow(el.target);
      }
    });

    return mainTable;
  }

  returnRow(person) {
    return `
        <tr>
          <th>${person.name}</th>
          <th>${person.age}</th>
          <th>${person.salary}</th>
          <th>${person.city}</th>
          <th><button class='btn'>X</button></th>
        </tr>
    `;
  }

  deleteRow(el) {
    el.parentElement.parentElement.remove();
  }
}
