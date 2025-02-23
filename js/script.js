$(document).ready(function () {
  $.getJSON("books.json", function (books) {
      var length = books.length;

      function displayBooks(bookList) {
          $("#books").empty(); // Clear previous books
          bookList.forEach((book) => {
              $("#books").append(
                  `<img class="book-images" data-id="${book.Number}" src="images/${book.Number}.jpg">`
              );
          });
          attachHoverEvents(bookList);
      }

      function attachHoverEvents(bookList) {
          $(".book-images").hover(
              function () {
                  let bookNumber = $(this).data("id");
                  let book = bookList.find((b) => b.Number == bookNumber);
                  if (book) {
                      $("#number").html("(#" + book.Number + ")");
                      $("#title").html(book.Title);
                      $("#author").html(book.Author);
                      $("#description").css("display", "flex");
                  }
              },
              function () {
                  $("#description").css("display", "none");
              }
          );
      }

      // ** Side Panel Toggle **  
      $("#open-sort-panel, #toggle-icon").click(function () {
          $("#sort-panel").toggleClass("open"); // Toggle open/close
      });

      $(".close-btn").click(function () {
          $("#sort-panel").removeClass("open"); // Close panel
      });

      // ** Sorting Logic **  
      $("#sort-options").on("change", function () {
          let sortedBooks = [...books]; // Clone array
          let sortBy = $(this).val();

          if (sortBy === "rating-high") {
              sortedBooks.sort((a, b) => a.Rating - b.Rating); 
          } else if (sortBy === "rating-low") {
              sortedBooks.sort((a, b) => b.Rating - a.Rating); 
          }

          displayBooks(sortedBooks);
      });

      // ** Reset Button Fix **  
      $("#reset-sort").click(function () {
          $("#sort-options").val(""); // Reset dropdown  
          displayBooks(books); // Show books in original order
      });

      // Initial book rendering  
      displayBooks(books);

      // Display currently reading book  
      $("#reading-book").html(books[length - 1].Title);
  });
});
