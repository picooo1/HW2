document.addEventListener('DOMContentLoaded', function() {
  var menuIcon = document.getElementById('menu-icon');
  var sidebar = document.getElementById('sidebar');
  var closeBtn = document.getElementById('closebtn');
  var searchIcon = document.getElementById('search-icon');
  var musicButton = document.getElementById('music-button');
  var song;
  var isPlaying = false;
  var showTextButton = document.getElementById('show-text-button');
  var textContainer = document.querySelector('.text-container');
  var text = "Be Yourself";
  var index = 0;
  var typingSpeed = 150;

  menuIcon.addEventListener('click', function() {
      sidebar.style.width = '12.5%'; // Open the sidebar (1/8th of the screen)
      menuIcon.style.display = 'none'; // Hide the menu icon
      searchIcon.style.marginRight = '15%'; // Move the search icon further to the left
  });

  closeBtn.addEventListener('click', function() {
      sidebar.style.width = '0'; // Close the sidebar
      menuIcon.style.display = 'inline'; // Show the menu icon again
      searchIcon.style.marginRight = '0'; // Reset the search icon position
  });

  musicButton.addEventListener('click', function() {
      if (!song) {
          song = new p5.SoundFile('Howls Moving Castle.mp3'); // Ensure you have a song file in your project
      }
      if (isPlaying) {
          song.stop();
          musicButton.textContent = 'Play Music';
      } else {
          song.play();
          musicButton.textContent = 'Stop Music';
      }
      isPlaying = !isPlaying;
  });

 

  function typeText() {
    if (index < text.length) {
        textContainer.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed); // Adjust typing speed
    } else {
        showTextButton.textContent = 'Hide Text';
    }
}

showTextButton.addEventListener('click', function() {
    if (textContainer.style.display === 'none') {
        textContainer.style.display = 'block'; // Show text container
        typeText();
        showTextButton.textContent = 'Hide Text';
    } else {
        textContainer.style.display = 'none'; // Hide text container
        showTextButton.textContent = 'Show Text';
        index = 0; // Reset index
        textContainer.innerHTML = ''; // Clear the text
    }
});
});
