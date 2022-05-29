
<p align="center"> 
  <img src="Frontend/src/assets/img/brand/Logo_black.png" alt="Face-In Dine Logo" width="200px" height="200px">
</p>
<h1 align="center"> Face-In Dine </h1>
<h3 align="center"> A restaurant and customer management browser-based system aimed at reinventing restaurant experiences using facial recognition technology.</h3>  

</br>

<p align="center"><a href="https://www.python.org/" target="_blank"><img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="made-with-python" /></a>&nbsp;<a href="https://opencv.org/" target="_blank"><img src="https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV"/></a>&nbsp;<a href="https://www.djangoproject.com/" target="_blank"><img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django" /></a>&nbsp;<a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/></a>&nbsp;<a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" /></a>&nbsp;<a href="https://firebase.google.com/" target="_blank"><img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" alt="Firebase"/></a>&nbsp;</p>

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
    <a href="#about-the-project"> ➤ About The Project</a><br/>
    <a href="#prerequisites"> ➤ Prerequisites</a><br/>
<!--     <a href="#dependencies"> ➤ Dependencies</a><br/> -->
<!--     <a href="#roadmap"> ➤ Roadmap</a><br/> -->
    <a href="#features"> ➤ Features</a><br/>
    <a href="#design"> ➤ System Design</a><br/>
    <a href="#features"> ➤ How to Run</a><br/>
    <a href="#deploy"> ➤ Deployment</a><br/>
    <a href="#references"> ➤ References</a><br/>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> :pencil: About The Project</h2>

<p align="justify"> 
  This project aims to create convinient and simple to use application takes care of check-ins, orders, check-outs of customers valuing personalized experiences of them as well as making it easier for the restaurants to do this, even when short staffed. Here we integrate restaurant cameras with the web app to face recognize customers. There would be two interfaces of the system which are the restaurant and customer interface. 
</p>

<p align="center">
  <img src="images/WISDM Activities.png" alt="" width="70%" height="70%">        
  <!--figcaption>Caption goe</figcaption-->
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PREREQUISITES -->
<h2 id="prerequisites"> :fork_and_knife: Prerequisites</h2>

The following open source packages are used in this project:
* Python
* Django
* Aiohttp
* OpenCV
* Deepface
* Numpy
* PostgreSQL
* Firebase
* Node
* ReactJS
* Axios
* Docker

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- DATASET -->
<!-- <h2 id="dependencies"> :hammer: Dependencies</h2>
<p> 
  The WISDM (Wireless Sensor Data Mining) dataset includes raw time-series data collected from accelerometer and gyroscope sensors of a smartphone and smartwatch with their corresponding labels for each activity. The sensor data was collected at a rate of 20 Hz (i.e., every 50ms). Weiss et.al., collected this dataset from 51 subjects who performed 18 different activities listed in Table 2, each for 3 minutes, while having the smartphone in their right pant pocket and wearing the smartwatch in their dominant hand. Each line of the time-series sensor file is considered as input.

<p align="center">
  <img src="images/Human Activity.gif" alt="Human Activity.gif" display="inline-block" width="60%" height="50%">
</p>


 _The WISDM dataset is publicly available. Please refer to the [Link](https://archive.ics.uci.edu/ml/datasets/WISDM+Smartphone+and+Smartwatch+Activity+and+Biometrics+Dataset+)_ 

  The following table shows the 18 activities represented in data set.
</p>

<p align="center">
  <img src="images/Activity Table.png" alt="Table1: 18 Activities" width="45%" height="45%">
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png) -->

<!-- ROADMAP -->
<!-- <h2 id="roadmap"> :dart: Roadmap</h2>

<p align="justify"> 
  Weiss et. al. has trained three models namely Decision Tree, k-Nearest Neighbors, and Random Forest for human activity classification by preprocessing the raw time series data using statistical feature extraction from segmented time series. 
  The goals of this project include the following:
<ol>
  <li>
    <p align="justify"> 
      Train the same models - Decision Tree, k Nearest Neighbors, and Random Forest using the preprocessed data obtained from topological data analysis and compare the
      performance against the results obtained by Weiss et. al.
    </p>
  </li>
  <li>
    <p align="justify"> 
      Train SVM and CNN using the preprocessed data generated by Weiss et. al. and evaluate the performance against their Decision Tree, k Nearest Neighbors, and Random Forest models.
    </p>
  </li>
</ol>
</p>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
 -->

<!-- Features -->
<h2 id="features"> :camera: Features</h2>
<!-- ## Features -->

#### ➤ Authentication :lock:
1. Application uses firebase token authentication for both customers and restaruants.
2. The application is configured to use both Google Sign in and Email - Password Sign In with firebase.
3. The system has a uni-login system where the system automatially detects whether logged in user is Customer or Restaurant.
4. The website also detects whether the logged in user is a first time user / registered user and redirects accordingly.

#### ➤ Restaurant Menu Management :scroll:
1. For a restaurant manager, the application takes great steps to remove the hassle of maintaining a menu. 
2. The system provides a form to add dishes of certain cuisines with their prices to restaurant managers.
3. The input menu for a restaurant is visible to all customers and visiting customers can order from the same.

#### ➤ Restaurant Order Management :yum:
1. Order management is a piece of cake with the help of this application.
2. The system removes the hassles of giving orders to waiters instead customers can order from the application.
3. Orders put in by customers are sorted according to time showed to restaurant managers.
4. Restaurant managers can update the order status when the order is ready to be served. 

#### ➤ Restaurant Customer Management :handshake:
1. The system is very helpful for customer management even during low manpower by hinting managers upon customers to focus upon.
2. All visiting customers are recognized by the system and their details are provided to the manager helping in maintain a secure environment.
3. Facially recognized customers are bound to pay for their orders as the system keeps track of the same.
4. Waiting customers can have various mood swings depending on the ambiance of the restaurant. The application provides a mood description for each customer, hinting customers that might need attention.
5. Since, managers know visiting and leaving customers, maintaing waiting lines for restaurant entrance becomes easier.

#### ➤ Payment Management :credit_card:
1. Orders placed from the application are stored in the database and each order has a payment status which tells whether a customer has paid for order.
2. Since, customer's facial ID is stored in the database, the customer is bound to pay for the order. This makes payment collection easier for restaurants.
3. The application stores UPI ID for all users during registration, which makes payment for customers easier and possibly automatic.

#### ➤ Customer Order Management :ramen:
1. Customer can see all their previous orders (paid or unpaid)
2. This makes it easier for customers to order regulars or cut back on junk food.

#### ➤ Customer Recognition and Personalisation :woman:
1. Upon entrance into any registered restaurant, the application lights up and welcomes the user on behalf of the restaurant manager.
2. The application also provides the menu, takes the person's orders and brings bills.
3. Customer recognition opens up even more personalised experience avenues, for example as a future use case, the application can suggest food according to customer's previous orders or customer mood in the restaurant, or even order customer regular. Emotion detector can also be used to give auto rating to a restaurant on behalf of the customer.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="design"> 🎨 System Design </h2>

<h3 id="Django Backend"> Django Server </h3>

#### Technology Stack
1. Django
2. Django Rest Framework
3. Django CORS Headers
4. Pyrebase
5. firebase-auth
6. PostgreSQL

#### Description
This server uses Django framework along with PostgreSQL database (heroku). The server acts as a REST API to fetch and store information regarding customers, restaurants and orders. The server uses **firebase-auth** to implement a token-type authentication of the requests. It uses the **Firebase Real time database** to fetch and update information regarding a customer's checkin status. The API is the primary source of information for the frontend.

<h3 id="Firebase">Firebase Application</h3>

#### Description
Firebase plays an essential role in the system design. Firebase **Storage**, **Real-time database** and **Authentication** are used in the system.
- **Storage**: Images uploaded by customer and restaurants are stored in the firebase Storage. The download URL for this stored image is then stored in PostgreSQL database by Django API. 
- **Real-time Database**: This is the heart of the check-in feature. This stores the status of each customer (restaurant in which the customer is present) as well as customers present in each restaurant. As an extended feature, it also stores the emotion of a customer. Real-time database is suitable for this data as the data is updated in real time and Firebase real-time database API makes it easy for application to detect a change in the status of customers.
- **Authentication**: We use Firebase authentication as it is a secure and easy method to authenticate both in the frontend and Django API.

<h3 id="AsynBackend">Asynchronous Server</h3>

#### Technology Stack
1. Asyncio
2. Aiortc
3. Aiohttp
4. Aiohttp-cors
5. Numpy
6. OpenCV
7. Pillow
8. Threading
9. Deepface

#### Description
Heart of our application resides in using face recognition to build a graph between customers in a restaurant. Naturally, this requires the restaurants to stream live feed of their restaurant environment to our server, where we recognize the customers and take action accordingly. To enable, real-time live streaming from frontend application to our server, we use Web Real-time communication (WEBRTC), Object Real-time Communcation (ORTC), Asynchronous Server and Web Sockets. Django REST Framework does not support Asynchronous calls and web sockets, hence we use another package called Aiohttp which supports the same. To enable WebRTC and ORTC between client and server, we use Aiortc (built upon Asyncio).

After streaming the live-feed frame by frame, we use the frame for facial recognition. We follow the following steps to process and proide our results.
1. We fetch a list of all users from our Django API. 
2. After each minute, we take a snapshot of the frame and start a seperate thread to process the snap. We start a seperate thread as to not interrupt the process of live streaming. 
3. We convert this snapshot to RGB format using OpenCV and scale it to a fixed height for faster computations.
4. We compare this processed face image snapshot from user profile pictures fetched earlier by the Django API using DeepFace. We also analyze the processed face image to determine customer's emotion. 
5. After successfull recognition and emotion analysis of all people in the image, we send the list of recognized customers with analysis to our Django API. 
6. The Django server uses this analysis and updates customer status, restaurant list and customer emotion in Firebase Real-time Database. Our frontend application detects this change in the database and re-renders components accordingly.
7. After sending the information, the thread ends and the next thread starts.

<h3 id="Frontend">Frontend Application</h3>

#### Technology Stack
1. ReactJS
2. Reactstrap
3. Argon-Design
4. Firebase
5. Axios

#### Description
This is the User Interface of our application. We use **Firebase** To communicate with our firebase application and **Axios** to communicate with out Django API and Asynchronouse Server. We use the vibrant and liquid component designs provided by Reactstrap and Argon-Design (by Creative-Tim) to make the user interface attractive and easy to use.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<!-- How to Run -->
<h2 id="run"> :arrow_forward: How to Run</h2>

- **Django API**: The API is hosted on this [link](https://intense-ocean-31538.herokuapp.com/) using Heroku and Docker, so no steps to be taken for this.
- **Firebase**: Firebase application is created on my console and integrated with the applications directly so no steps to be taken.
- **Asynchronous Backend**: One must run this in there system for a demo of the application. Steps to the run the same are as follows: 
   1. If docker is not installed, install docker from [here](https://docs.docker.com/engine/install/).
   2. Pull and run the docker image from docker hub, using the command:
   ```bash
   docker run -d --name faceindineasync -e "PORT=8765" -p 8080:8765 sadhvikadari2k1/faceindine-async
   ```
   3. The asynchronous backend is now running on [localhost:8080](http://localhost:8080/).
   4. To stop the server use the commands:
  ```bash
  docker stop sadhvikadari2k1/faceindine-async
  docker rm sadhvikadari2k1/faceindine-async
  ```
- **Frontend Application**: Steps to run the frontend application:
   1. If node / yarn is not installed, install node from [here](https://nodejs.org/en/download/) and yarn from [here](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).
   2. Clone this repository.
   3. Open a terminal in the Frontend directory.
   4. Install node packages using the command:
    ```bash
      yarn install
    ```
   5. Run the application using the command:
    ```bash
      yarn start
    ```
   6. The application runs on [localhost:3000](http://localhost:3000/login-page)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<!-- Deployment -->
<h2 id="deploy"> :link: How I deployed? </h2>

- **Django API**: I containerized the application by creating a Dockerfile. I pushed the container on my heroku application. The link for the hosted container is [https://intense-ocean-31538.herokuapp.com/](https://intense-ocean-31538.herokuapp.com/).
- **Firebase**: Firebase application can be built from any google account. I used my google account to build the firebas application and integrated the credentials directly into required applications.
- **Asynchronous Backend**: I containerized the application by creating a Dockerfile. I built an image of the container and hosted it on my docker hub. The link for the container repository is [https://hub.docker.com/repository/docker/sadhvikadari2k1/faceindine-async](https://hub.docker.com/repository/docker/sadhvikadari2k1/faceindine-async).
- **Frontend Application**: I had plans to host the application using Netlify, however due to failure to integrate netlify hosted - Frontend application and heroku hosted - Asynchronous backend because of absence of TURN servers, the frontend application is left unhosted. 

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- REFERENCES -->
<h2 id="references"> :books: References</h2>
 <ul> 
  <li>
      Creative Tim : https://www.creative-tim.com
  </li>
  <li>
    Argon by Creative Tim : https://www.creative-tim.com/product/argon-dashboard-react
  </li>
  <li>
    Django Documentation : https://docs.djangoproject.com/
  </li>
  <li>
    Django Rest Framework documentation : https://www.django-rest-framework.org/
  </li>
  <li>
    Django CORS header documentation : https://pypi.org/project/django-cors-headers/
  </li>
  <li>
    Firebase Realtime database documentation : https://firebase.google.com/docs/database
  </li>
  <li>
    Firebase Authentication Documentation : https://firebase.google.com/docs/auth
  </li>
  <li>
    Firebase Storage Documentation : https://firebase.google.com/docs/storage
  </li>
  <li>
    WebRTC Documentation : https://webrtc.org/
  </li>
  <li>
    Aiortc Documentation : https://aiortc.readthedocs.io/
  </li>
  <li>
    Aiohttp Documentation : https://docs.aiohttp.org/
  </li>
  <li>
  Deepface Documentation : https://pypi.org/project/deepface/
  </li>
  <li>
    Python Threading Documentation : https://docs.python.org/3/library/threading.html
  </li>
  <li>
    OpenCV Documentation : https://docs.opencv.org/4.x/
  </li>
</ul>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

✤ <i>This is the final project submission for the Microsoft Engage Mentorship Program '22, at <a href="https://www.microsoft.com/">Microsoft</a><i>
