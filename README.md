# weather_monitoring

***Project Overview***

This project is a real-time weather monitoring system that continuously retrieves weather data for selected Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) using the OpenWeatherMap API. It provides weather insights with daily rollups and aggregates and supports user-configurable alert thresholds for temperature conditions.

***Features***

1.Fetches weather data at intervals and converts temperature to Celsius.

2.Stores weather data in MySQL and calculates daily summaries.

3.onfigurable alerts when temperature thresholds are breached.

4.Frontend interface to view weather summaries.

**Project Architecture**

Frontend: Built with ReactJS, displays weather summaries.

Backend: NodeJS + ExpressJS for handling API requests and processing weather data.

Database: MySQL to store and aggregate weather data.

API: OpenWeatherMap API to fetch real-time weather data.
