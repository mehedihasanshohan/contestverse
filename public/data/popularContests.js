export const popularContests = [
  {
    id: 1,
    name: "Creative Logo Design",
    image: "https://i.ibb.co/z8x8qgp/logo.jpg",
    participants: 120,
    description: "Design a modern, minimalistic logo for a tech startup."
  },
  {
    id: 2,
    name: "Article Writing Challenge",
    image: "https://i.ibb.co/6yBn0Jw/article.jpg",
    participants: 95,
    description: "Write an engaging article on trending global issues."
  },
  {
    id: 3,
    name: "UI/UX Web Design",
    image: "https://i.ibb.co/QpZMzB0/ui.jpg",
    participants: 150,
    description: "Create a clean UI dashboard for a finance management app."
  },
  {
    id: 4,
    name: "Photography Contest",
    image: "https://i.ibb.co/KLPxPyH/photo.jpg",
    participants: 80,
    description: "Capture the beauty of nature and submit your best shots."
  },
  {
    id: 5,
    name: "Business Idea Pitch",
    image: "https://i.ibb.co/kHmpccn/business.jpg",
    participants: 60,
    description: "Pitch your innovative business idea to win big rewards!"
  }
].sort((a, b) => b.participants - a.participants);
