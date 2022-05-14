function highlight(table) {
  let titleRow = table.rows[0];
  let statusCellIndex = null;
  let ageCellIndex = null;
  let genderCellIndex = null;
  let nameCellIndex = null;

  for (let i = 0; i < titleRow.cells.length; i++) {
    let index = titleRow.cells[i].textContent;
    switch (index) {
    case 'Name': nameCellIndex = i;
      break;
    case 'Age': ageCellIndex = i;
      break;
    case 'Gender': genderCellIndex = i;
      break;
    case 'Status': statusCellIndex = i;
      break;
    default:
      break;
    }
  }

  for (let i = 1; i < table.rows.length; i++) {
    let currentRow = table.rows[i];
    let statusCell = currentRow.cells[statusCellIndex];

    if (statusCell.dataset.available) {
      statusCell.dataset.available == 'true'
        ? currentRow.classList.add('available') 
        : currentRow.classList.add('unavailable'); 
    } else {
      table.rows[i].setAttribute('hidden', true);
    }

    let genderSCell = currentRow.cells[genderCellIndex];
    genderSCell.textContent == 'm'
      ? currentRow.classList.add('male') 
      : currentRow.classList.add('female'); 
    
    let ageCell = currentRow.cells[ageCellIndex];
    if (+ageCell.textContent < 18) {
      currentRow.style.textDecoration = "line-through";
    }
    
  }
 
}
