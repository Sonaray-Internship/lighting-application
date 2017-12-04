<html>
<title>Email Page</title>
  <head>
    <body>
      <style>
      body {
          margin: auto;
          width: 60%;
          padding: 20px;
          border: 3px solid #45B39D;
          background: #45B39D;
          text-align: center;
          position: relative;
      }

      form {
          width: 70%;
          padding: 80px 50px;
          margin-left: -35%;
          background-color: #f2f2f2;
          display: inline-block;
          border-radius: 4px;
          box-sizing: border-box;
          position: absolute;
          font-size: 18px;
          left : 50%;
      }

      button {
        background-color: #45B39D;
        border: none;
        color: white;
        padding: 5px 10px;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        margin: 4px 2px;
        cursor: pointer;
      }

      </style>

      <form method="POST" action="#">
      <img src="sonaraylogo.png"/>
      <h1>Email Data</h1>

        <label>Name</label>
        <input type="text" name="name" placeholder="please enter your name .." size="25" required/> <br><br>
        <label>Email</label>
        <input type="text" name="email" placeholder="please enter your email .." size="25" required/> <br><br>
        <label>Contact</label>
        <input type="text" name="contact" placeholder="please enter your contact .." size="25" required/> <br><br>

        <button class="button">Send</button>
      </form>

      <?php
          if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['contact'])) {

            $name= $_POST['name'];
        		$email= $_POST['email'];
        		$contact= $_POST['contact'];

            $subject = "Sonaray lighting Simulator";
            $message = "Dear $name, $contact, Thanks for using our Light Simulating Calculator";

            mail($email, $subject, $message);
          }
       ?>
    </body>

  </head>
</html>
