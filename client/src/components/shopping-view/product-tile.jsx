import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import StarRatingComponent from "../common/star-rating"; // Import a star rating component
import { Heart, HeartOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/store/shop/favorite-slice/favorite-slice";

function ShoppingProductTile({ product, handleAddToCart, handleGetProductDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  
  const favorites = useSelector((state) => state.favorites?.items || []);
  const isFavorite = favorites.some((fav) => fav._id === product._id);

  function handleFavoriteClick(e) {
    e.stopPropagation();
    if (!user) return; // Optionally show login prompt
    if (isFavorite) {
      dispatch(removeFavorite({ userId: user.id, productId: product._id }));
    } else {
      dispatch(addFavorite({ userId: user.id, productId: product._id }));
    }
  }

  return (
    <Card className="flex flex-col justify-between w-full max-w-sm mx-auto h-full hover:shadow-lg transition-shadow transform hover:scale-105">
      {/* Product Image and Details */}
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {/* Add the favorite button here */}
          <div className="absolute top-2 right-2 z-10">
            <button onClick={handleFavoriteClick}>
              {isFavorite ? (
                <HeartOff className="text-red-500 w-6 h-6" />
              ) : (
                <Heart className="text-gray-400 w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">{product?.category}</span>
            <span className="text-muted-foreground">{product?.brand}</span>
          </div>

          {/* Reviews Section */}
          <div className="flex items-center gap-2 mb-2">
            <StarRatingComponent rating={product?.averageReview || 0} />
            <span className="text-muted-foreground text-sm">
              ({product?.averageReview?.toFixed(1) || "0.0"})
            </span>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Rs. {formatPrice(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">Rs. {formatPrice(product?.salePrice)}</span>
            ) : null}
          </div>
        </CardContent>
      </div>

      {/* Add to Cart Button */}
      <CardFooter className="flex gap-2">
        <Button
          onClick={() => handleAddToCart(product)}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </Button>
        <Button
          variant={isFavorite ? "destructive" : "outline"}
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick(e);
          }}
          className="flex items-center justify-center px-4 py-2 rounded-md"
        >
          {isFavorite ? (
            <>
              <HeartOff className="w-5 h-5 mr-2" />
              Remove Favorite
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Add to Favorite
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
