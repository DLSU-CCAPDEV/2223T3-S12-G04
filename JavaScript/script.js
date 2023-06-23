function delete_Profile() {
	let deletion = "Are you sure you want to delete your user profile?";
		if (confirm(deletion) == true) {
			deletion = alert("Sucessfully deleted! Redirecting to home page.");
			location.href = 'guest_home.html';
		}
		else {
			deletion = alert("Canceled!");
		}
	document.getElementById("deleteprofile").innerHTML = deletion;
}

function guest_Register() {
         alert("You have to register first!");
         location.href = 'register.html';
        }

function logout() {
	let logout = "Are you sure you want to logout?";
		if (confirm(logout) == true) {
			logout = alert("Sucessfully logged out! Redirecting to home page.");
			location.href = 'guest_home.html';
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
        window.location.href = "student_home.html";
      } else if (selectedRole === "tech") {
        window.location.href = "labtech_home.html";
      }
    }
