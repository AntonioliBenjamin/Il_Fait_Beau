import { Weather } from "./../entities/Weather";

export const weatherFixtures: Weather[] = [
  {
    props: {
      city: "paris",
      humidity: 0.99,
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 48.85341,
      lon: 2.3488,
    },
  },
  {
    props: {
      city: "marseille",
      humidity: 0.99,
      tempInCelcius: 264,
      windSpeed: 150,
      createdAt: new Date(),
      lat: 43.29695,
      lon: 5.38107,
    },
  }
]
