document.addEventListener('DOMContentLoaded', function() {
  var checkList = document.getElementById('task-recur');
  checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }
});