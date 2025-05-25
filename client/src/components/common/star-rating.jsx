import { StarIcon } from "lucide-react";

function StarRatingComponent({ rating, handleRatingChange }) {
  const maxStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }, (_, index) => (
        <StarIcon
          key={index}
          onClick={() => handleRatingChange(index + 1)} // Set rating on click
          className={`w-6 h-6 cursor-pointer ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default StarRatingComponent;
