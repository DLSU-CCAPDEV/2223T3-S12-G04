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
			logout = alert("Sucessfully logged out! Redirecting to home page.");
			location.href = '/guesthome';
	document.getElementById("logout").innerHTML = logout;
}

/*
function edit_reservation() {
	alert('Edited!');
}

function remove_reservation() {
	alert('Removed!');
}
*/

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

	/*
	function remove_reservation(reservationId) {
		const row = document.querySelector(`tr[data-reservation-id="${reservationId}"]`);
		if (row) {
		  row.remove();
		}
	}
	*/

	$(document).ready(function() {
		// Event listener for the "Remove" buttons
		$('.delete-button').click(function() {
			var reservationId = $(this).closest('tr').attr('id'); // Get the reservationId from the closest parent <tr>
			var idNum = 12048233; // Use the value of idNum from your template (if it's available)
	  
			if (confirm('Are you sure you want to remove this reservation?')) {
				// Make an AJAX request to delete the reservation
				$.ajax({
					url: `/delete/${idNum}/${reservationId}`,
					method: 'GET',
					success: function (data) {
						// On successful deletion, remove the table row from the DOM
						$('#' + reservationId).remove();
					},
					error: function () {
						alert('Failed to remove the reservation.');
					}
				});
			}
		});
	});

	function edit_reservation(idNum, computerLab) {
		let edit = "Are you sure you want to edit your reservation?";
	
		if(confirm(edit) == true){
			if(computerLab === 1)
				window.location.href = "/res1/" + idNum;
			
			else if(computerLab === 2)
				window.location.href = "/res2/" + idNum;
			
			else if(computerLab === 3)
				window.location.href = "/res3/" + idNum;
		}
		else{
			edit = alert("Canceled!");
		}
	}

