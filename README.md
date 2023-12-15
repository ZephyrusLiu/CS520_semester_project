# CS520 Course Project: Patient Tracker System

## CPU_burned

## Group Members: Yujin Qin, Yuqi Liu, Yi Ding


## How to use

To correctly run this application, please install Node.js on your device and run the following commands:
npm init
npm install -S express
node --experimental-modules server.mjs
If you correctly run this commands, you could see "Connected correctly to server" in your terminal.


## User Interface
| Name | Purpose | 
| :------------- | :-------------------- | 
| homepage | Home Page Shown Before Login |
| signup | Page For User To Create Account | 
| login | Page For User To Login In | 
| userinfo | User(Doctor)'s Profile With Personal Information | 
| dashboard | Home Page Shown After Login |
| add_personal_info | Add Personal/Health Information |
| add_medical_his | Add Treatment/Medical History |
| view_personal | Page For Viewing Personal/Health Information |
| view_treatment | Page For Viewing Treatment/Medical History |
| view_all_patients | Page For Viewing All Patients Basic Information |


## Database
### Doctor
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| firstname | string | First Name of User |
| lastname | string | Last Name of User |
| birthday | string | Date of Birth |
| gender | string | Gender |
| email | string | Email |
| username | string | Unique Username |
| gender | string | Gender |
| password | string | Password of Account |
| cpassword | string | Confirmation of Password |

### Patient
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| firstname | string | First Name of Patient |
| lastname | string | Last Name of Patient |
| birthday | string | Date of Birth |
| gender | string | Gender |
| phone | string | Phone Number of Patient |
| email | string | Email Address of Patient |
| e_phone | string | Emergency Contact Phone Number |
| e_email | string | Emergency Contact Email Address |
| has_healthinsurance | boolean | Whether Patient Has Health Insurance |
| blood_type | string | Blood Type of the Patient |
| height | string | Height |
| weight | string | Weight |
| medical_history | string | Medical History of Patient |
| family_mh | string | Family/Hereditary Disorder History |
| allergic | string | Allegic Conditions |
| addition_info | string | Addition Information |

### Treatment
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| id | string | Patient ID |
| heart_rate | string | Last Monitored Heart Rate |
| oximetry | string | Last Monitored Oximetry |
| h_blood | string | Last Monitored Higher Blood Pressure |
| l_blood | string | Last Monitored Lower Blood Pressure |
| record | string | Any Medical/Treatment Record |



## Authentication:

All users are required to create an account with a unique username and password if they don't have an account existed. Only users (doctors) after logging in can browse the patients records. If they do not log in, they will be derive to log in page.


## Division of Labor

### Yujin Qin
Designed initial user interface, drew raw UI frame.
Implemented user interface using HTML and javascript, applied CSS style.
Finished the functionalities of website buttons.
Completed the data visualization functionality.
Completed the README.md, half of the final report, made flowchart of project.
Designed database structure for user, patient, and treatment.

### Yuqi Liu
Contributed to the design of initial UI.
Implemented user interface using HTML and javascript, applied CSS style.
Implemented create, read, update, delete functionality for users.
Finished image upload and download functionality in both front and back-end.
Implemented client side RESTful API call and fetch for both sync and async calls.

### Yi Ding
Implemented the subscribing notification functionality.
Completed half of the final report.
Built server.js, MongoDB database and connect to Express server.
Implemented client side RESTful API call and fetch for both sync and async calls.
Dynamited client site website based on MongoDB data for add info and update info pages.


## Conclusion
We had a good learning experience working together through the whole semester and we all learned how to use HTML, CSS, and JavaScript to build up a website and make it usable for anyone. We communicated well with a to-do list and everyone tried their best in the group work.

The most difficult thing is figuring out the logic, website flow and implementing our ideas. It was quite difficult to work on this website as we though we thought we had thoroughly planned out the structure of the wireframe but realized it was always missing some new logic.  As figuring out the logic and workflow of our website was always quite troublesome as there were so many variables between our users and the data in which they can/cannot interact with.  The many parts of our web were always depending and dependent on each other forcing us to stop a job to fix or create the relying job before we could test or incorporate another part.  

Another challenging problem was applying new technology to the website such as MongoDB, in which we never learned from class. This required us to do a lot of research and trial and error to make it functional and easy to traverse/adjust.  

Our team would have like to have had a better design on the wireframe of our website.  We realized while working on this project we came across many instances where there were extra/missing code that we didn't need or needed to add. For example, at first we had a submit lost, submit found, and update page that were essentially the same except for a couple of buttons and text differences. Also, it would be very helpful if everyone had their own branch before we started working because if two people are working on the same file at the same time, some unlucky person will have their code/s overwritten by someone else.
