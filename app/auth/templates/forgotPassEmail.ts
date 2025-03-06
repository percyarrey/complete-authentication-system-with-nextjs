const forgotPassTemplate = `<!-- app/auth/templates/forgotPassEmail.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password for {{website}}!</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 20px;
        border-radius: 10px; /* Medium rounded corners */
        border: 1px solid gray;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Thicker box shadow */
      }
      .header {
        padding: 10px;
        display: flex;
        justify-content: end;
      }
      .title {
        text-align: center; /* Center text */
        font-weight: bold;
        font-size: large;
        margin-top: 20px;
        color: #28a745;
      }
      .header img {
        width: 40px; /* Adjust size as needed */
        margin-left: auto;
      }
      .content {
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
      }
      a {
        color: #28a745; /* Primary color */
        text-decoration: none;
      }
      .code {
        display: inline-block;
        padding: 10px 20px;
        background-color: #e7f3fe; /* Light background for code */
        border: 1px solid #28a745;
        border-radius: 5px;
        font-weight: bolder;
        font-size: 30px;
        margin: 20px auto;
        letter-spacing: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="{{logosrc}}" alt="Logo" />
      </div>
      <div class="title">Reset Your Password</div>
      <div class="content">
        <p style="font-weight: bold">Hi {{name}},</p>
        <p>
          We received a request to reset the password for your account
          associated with <strong>{{email}}</strong>.
        </p>
        <p>Your password reset code is:</p>
        <div style="display: flex">
          <div class="code">{{code}}</div>
        </div>
        <!-- Display the 4-digit code -->
        <p>Please enter this code to reset your password.</p>
        <p>
          If you did not request a password reset, please ignore this email.
        </p>
        <p>Best regards,<br />The {{website}} Team</p>
      </div>
      <div class="footer">
        <p>&copy; {{year}} {{website}}. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
export default forgotPassTemplate;
