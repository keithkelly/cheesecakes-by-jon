!function() {
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCW-Jxq-TiGgFUtAKoJYcsq5tImyB1seIA",
    authDomain: "cheesecakes-by-jon.firebaseapp.com",
    databaseURL: "https://cheesecakes-by-jon.firebaseio.com",
    storageBucket: "cheesecakes-by-jon.appspot.com",
    messagingSenderId: "712478989965"
  });

  firebase.database().ref('cheesecakes').orderByChild('price').on('value', function(cheesecakes) {
    cheesecakes.forEach(function(cheesecake) {
      const buttonId = cheesecake.val().name.toLowerCase().replace(' ', '-');
      html = `
        <div class="cheesecake">
          <img src="${cheesecake.val().img}" alt="${cheesecake.val().name}">
          <h3>${cheesecake.val().name}</h3>
          <div class="info">
            <p>${cheesecake.val().desc}</p>
            <div class="order">
              <span>$${cheesecake.val().price}</span>
              <button id="${buttonId}">Order</button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('cheesecakes').insertAdjacentHTML('beforeend', html);
      document.getElementById(buttonId).addEventListener('click', function() {
        const name = cheesecake.val().name;
        const subject = encodeURIComponent('Order ' + name + ' Cheesecake');
        const body = encodeURIComponent('Hi Jon,\n\nI would like to order the ' + name + ' cheesecake.\n\n{{Please insert any details or quetions you have here}}');
        window.open('mailto:jon_hernandez@msn.com?subject=' + subject + '&body=' + body);
      });
    });
  });
}();