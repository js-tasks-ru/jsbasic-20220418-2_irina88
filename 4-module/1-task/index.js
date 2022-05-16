function makeFriendsList(friends) {
  let ulEl = document.createElement('ul');
  friends.forEach(elem => {
    let liEl = `<li>${elem.firstName} ${elem.lastName}</li>`;
    ulEl.innerHTML += liEl;
  });
  return ulEl;
}
