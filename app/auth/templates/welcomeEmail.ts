const welcomeEmailTemplate = `<!-- app/auth/templates/welcomeEmail.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to {{website}}!</title>
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
        color: var(--primary-color);
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="{{logosrc}}" alt="Logo" />
      </div>
      <div class="title">Welcome to {{website}}!</div>
      <div class="content">
        <p style="font-weight: bold">Hi {{name}},</p>
        <p>
          Thank you for signing up for {{website}}. We are thrilled to have you
          on board!
        </p>
        <p>Your registered email is: <strong>{{email}}</strong></p>
        <p>
          Feel free to explore our website and reach out if you have any
          questions.
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
export default welcomeEmailTemplate;
