// Import the images directly from your assets folder
import fortKochiImg from '../assets/fort-kochi.jpg';
import marineDriveImg from '../assets/marine-drive.jpg';
import edappallyImg from '../assets/edappally.jpg';
import kakkanadImg from '../assets/kakkanad.jpg';

export const mockLocations = [
  {
    id: 1,
    name: "Fort Kochi",
    slug: "fort-kochi",
    safetyScore: 9.4,
    description: "Historic charm with high CCTV coverage, frequent patrols, and well-lit walkways.",
    image: fortKochiImg // Using the local image
  },
  {
    id: 2,
    name: "Marine Drive",
    slug: "marine-drive",
    safetyScore: 8.8,
    description: "Beautiful promenade, highly populated, popular for evening walks with Pink Police presence.",
    image: marineDriveImg
  },
  {
    id: 3,
    name: "Edappally",
    slug: "edappally",
    safetyScore: 9.0,
    description: "Urban hub with easy access to Kochi Metro, major malls, and 24/7 transport availability.",
    image: edappallyImg
  },
  {
    id: 4,
    name: "Kakkanad",
    slug: "kakkanad",
    safetyScore: 8.5,
    description: "IT corridor with secure tech parks, bustling cafes, and reliable cab services.",
    image: kakkanadImg
  }
];