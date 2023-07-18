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
	// Proceed with registration
	redirectToPage();
	}
}
