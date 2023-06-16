function check_login()
{
    username=document.getElementById('username').value;
    password=document.getElementById('password').value;
    get_login_verification(username,password);
}

function get_login_verification(username, password) {
    var data = { 'username': username, 'password': password };
    fetch("/get_username_passwords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responsedata => {
        var status = responsedata.status; // Assuming the server returns a JSON object with a 'status' property as a boolean
        if(responsedata==(true))
        {
            window.location.href = '/maps';
        } // Output the received status value as a boolean
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  