# CS520 Course Project: Patient Tracker System

## CPU_burned

## Group Members: Yujin Qin, Yuqi Liu, Yi Ding


## Overview
The main goal of this project is to build a Patient Tracker System designed for doctors and healthcare professionals. In today's era of modern big data, the importance of data recording cannot be overstated. Software like this patient tracker system is an efficient and useful tool. This digital system replaces traditional paper records and allows doctors to access patient records remotely and update the database in real time. Furthermore, the system ensures data accuracy and security by using encryption to protect data both in transit and at rest. Employ protocols such as HTTPS will used for secure communication over the network. 


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

### Yuqi Liu
Implemented user interface using HTML and javascript, applied CSS style.


## Conclusion
We had a good learning experience working together through the whole semester and we all learned how to use HTML, CSS, and JavaScript to build up a website and make it usable for anyone. We communicated well with a to-do list and everyone tried their best in the group work.

The most difficult thing is figuring out the logic, website flow and implementing our ideas. It was quite difficult to work on this website as we though we thought we had thoroughly planned out the structure of the wireframe but realized it was always missing some new logic.  As figuring out the logic and workflow of our website was always quite troublesome as there were so many variables between our users and the data in which they can/cannot interact with.  The many parts of our web were always depending and dependent on each other forcing us to stop a job to fix or create the relying job before we could test or incorporate another part.  

Another challenging problem was applying new technology to the website such as MongoDB, in which we never learned from class. This required us to do a lot of research and trial and error to make it functional and easy to traverse/adjust.  

Our team would have like to have had a better design on the wireframe of our website.  We realized while working on this project we came across many instances where there were extra/missing code that we didn't need or needed to add. For example, at first we had a submit lost, submit found, and update page that were essentially the same except for a couple of buttons and text differences. Also, it would be very helpful if everyone had their own branch before we started working because if two people are working on the same file at the same time, some unlucky person will have their code/s overwritten by someone else.
