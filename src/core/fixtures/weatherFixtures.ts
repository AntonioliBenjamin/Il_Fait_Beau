import { Weather } from "./../entities/Weather";

export const weatherFixtures: Weather[] = [
  {
    props: {
      city: "paris",
      humidity: 0.99,
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 9999,
      lon: 1111,
    },
  },
  {
    props: {
      city: "marseille",
      humidity: 0.99,
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 9999,
      lon: 1111,
    },
  },
  {
    props: {
      city: "las vegas",
      humidity: 0.99,
      lat: 7777,
      lon: 7777,
      tempInCelcius: 18,
      windSpeed: 45,
      createdAt: new Date(),
    },
  },
];
