## SparkDigital  Visualizer Dashboard

Prerequisites
Before running the project, make sure you have the following installed:

Node.js (version >= 20)
npm (Node Package Manager)

Steps to Set Up and Run
Clone the repository:

Clone the project repository to your local machine: git clone <repository-url>

Install the required dependencies using npm: npm install

After the dependencies are installed, you can start the development server using the following command:npm run dev

This will start the frontend React application at http://localhost:3000.

How the Frontend Works
The frontend of this application is built using React and allows users to interact with the backend to upload files and visualize data.

File Upload: Users can upload files (in JSON format) to the backend using a file input.
Data Visualization: Once the data is uploaded, it is processed and stored in the database by the Spring Boot backend. The frontend retrieves this data through API calls and visualizes it in different types of charts using react-chartjs-2. The available chart types include:
Line Chart: To show trends over time.
Bar Chart: To compare data across categories or time periods.
Pie Chart: To display proportions of different data points.
Filtering: Users can filter data based on a specific date range (start date to end date) and by category (e.g., total active cases). Both filters can be applied simultaneously to refine the data visualized in the charts.


## Front End Project Development

Muhluri Mhlongo - Full Stack Developer
  