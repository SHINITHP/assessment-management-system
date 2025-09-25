<!-- Assessment Management Assignment -->

<!-- Features Implemented -->

    -User authentication (sign-up, sign-in, OTP verification).

    -JWT-based authorization with refresh token support.

    -Assessment management API.

    -Report generation based on session IDs

<!-- API Endpoints -->

    -POST /sign-up - Register a new user.
    
    -POST /verify-otp - Verify sign-up OTP.
    
    -POST /sign-in - Log in and get JWT.
    
    -POST /refresh-token - Refresh JWT using refresh token.

    -GET / - Get assessments (requires auth).
    -
    -POST /generate-report/:sessionId - Generate a report.

<!-- Clone the repositore -->

    -git clone : https://github.com/SHINITHP/assessment-management-system.git

    -cd assessment-management-system

<!-- Install Backend dependencies -->

    -cd backend
    -npm install

<!-- Install Frontend dependencies -->

    -cd ../frontend
    -npm install

<!-- Set up environment variables in backend/.env -->

    -MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/assessment?retryWrites=true&w=majority
    -OTP_JWT_SECRET=Assessment_Management_otp_secret
    -JWT_SECRET=your_jwt_secret
    -SENDGRID_API_KEY=
    -PORT=
    -EMAIL_USER=
    -EMAIL_PASS=

<!-- Local Development -->

<!-- Start the backend server -->

    -cd backend
    -npm run dev

<!-- Start the frontend -->

    -cd ../frontend
    -npm run dev
