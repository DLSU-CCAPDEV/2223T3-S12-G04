function delete_Profile() {
	let deletion = "Are you sure you want to delete your user profile?";
		if (confirm(deletion) == true) {
			deletion = alert("Sucessfully deleted! Redirecting to home page.");
			location.href = '/guesthome';
		}
		else {
			deletion = alert("Canceled!");
		}
	document.getElementById("deleteprofile").innerHTML = deletion;
}

function guest_Register() {
         alert("You have to register first!");
         location.href = '/register';
        }

function logout() {
	let logout = "Are you sure you want to logout?";
		if (confirm(logout) == true) {
			logout = alert("Sucessfully logged out! Redirecting to home page.");
			location.href = '/guesthome';
		}
		else {
			logout = alert("Canceled!");
		}
	document.getElementById("logout").innerHTML = logout;
}

function edit_reservation() {
	alert('Edited!');
}

function remove_reservation() {
	alert('Removed!');
}

function redirectToPage() {
      var selectedRole = document.getElementById("roles").value;

      if (selectedRole === "student") {
        window.location.href = "/studenthome";
      } else if (selectedRole === "tech") {
        window.location.href = "/labtechhome";
      }
    }
function validateLogin() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if (username === "" || password === "") {
	alert("Please fill in all the fields.");
	} else {
		redirectToPage();
	}
}

function validateRegistration() {
	var roles = document.getElementById("roles").value;
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("pw").value;

	if (roles === "" || firstname === "" || lastname === "" || email === "" || password === "") {
	alert("Please fill in all the fields.");
	} else {
	redirectToPage();
	}
}

var seats = document.querySelectorAll('.seat');
    var reserveButton = document.querySelector('.reserve-button');

    // Add click event listener to each seat
    seats.forEach(function (seat) {
      seat.addEventListener('click', function () {
        if (!this.classList.contains('taken')) {
          this.classList.toggle('selected');
          updateReserveButtonStatus();
        }
      });
    });

    // Update reserve button status based on selected seats
    function updateReserveButtonStatus() {
      var selectedSeats = document.querySelectorAll('.seat.selected');
      reserveButton.style.display = selectedSeats.length > 0 ? 'block' : 'none';
    }

    // Example: Redirect to a confirmation page after reservation
    reserveButton.addEventListener('click', function () {
      var selectedSeats = document.querySelectorAll('.seat.selected');
      var seatNumbers = [];
      selectedSeats.forEach(function (seat) {
        seatNumbers.push(seat.getAttribute('id'));
      });

      var schedule = document.getElementById('sched').value;

      // Redirect to confirmation page with seat numbers and schedule
      window.location.href = '/confirmation?seats=' + seatNumbers.join(',') + '&schedule=' + schedule;
    });

	function remove_reservation(reservationId) {
		const row = document.querySelector(`tr[data-reservation-id="${reservationId}"]`);
		if (row) {
		  row.remove();
		}
	}
