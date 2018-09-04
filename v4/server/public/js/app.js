const res = document.querySelector('#result');

function get() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todos');
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) resolve(xhr.responseText);
        else reject(new Error('Error!!!!'));
      }
    };
  });
}

get()
  .then(result => res.innerHTML = result)
  .catch(error => res.innerHTML = error);
