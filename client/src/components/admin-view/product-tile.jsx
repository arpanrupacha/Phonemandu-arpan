import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatPrice } from "@/lib/utils";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto h-full flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Rs {formatPrice(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">
                Rs {formatPrice(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      {/* CardFooter is now always at the bottom */}
      <CardFooter className="flex justify-between items-center mt-auto">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => handleDelete(product?._id)} variant="destructive">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
