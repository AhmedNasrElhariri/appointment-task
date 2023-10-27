- Tech stack used, including specific libraries / versions
  (Reactjs,antd,axios,react-google-recaptcha) versions at package.json
- Project setup procedure
    1- cd frontend
    2- npm install
    3- npm start
- Quick paragraph with how you approached the project, what you liked
    1- I create user table and each user has type (Patient,Doctor,Admin).
    2- I create register module but by default this user creared is patient user because the doctors and admins don't have permission to register.
    3- I create login module and all types of users can login and used JWT technique
    4- I create appointment table contain (patientId,uaserId => creator,doctorId,date,time,status)
    and make the status enum (Archived,Completed,Canceled)
    5- I create modules for list appointments , list users(patients,doctors,admins),list patients ,new appointment,  
    . admin has permissions for all modules
    . doctors only has list their appointments and update appointment status
    .patients only has list their appointments and create appointment , and at patient selector the patient only appears
- what you liked
  the task is perfect.
- what you didn’t like, and where you faced issues.
  I want to add time appointment hidden feature but i don't have enough tine
