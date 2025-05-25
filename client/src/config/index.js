export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "phones", label: "Phones" },
      { id: "laptops", label: "Laptops" },
      { id: "tablets", label: "Tablets" },
      { id: "accessories", label: "Accessories" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "Samsung", label: "Samsung" },
      { id: "Realme", label: "Realme" },
      { id: "Lenevo", label: "lenevo" },
      { id: "Asus", label: "Asus" },
      { id: "Vivo", label: "Vivo" },
      { id: "Oppo", label: "Oppo" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  // {
  //   id: "phone",
  //   label: "Phone",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "laptops",
  //   label: "Laptops",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "tablets",
  //   label: "Tablets",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "accessories",
  //   label: "Accessories",
  //   path: "/shop/listing",
  // },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  phones: "Phones",
  laptops: "Laptops",
  tablets: "Tablets",
  accessories: "Accessories",
};

export const brandOptionsMap = {
  samsung: "Samsung",
  realme: "Realme",
  asus: "Asus",
  lenevo: "Lenevo",
  vivo: "Vivo",
  oppo: "Oppo",
};

export const filterOptions = {
  category: [
    { id: "phones", label: "Phones" },
    { id: "laptops", label: "laptops" },
    { id: "tablets", label: "Tablets" },
    { id: "accessories", label: "Accessories" },
  ],
  brand: [
    { id: "Samsung", label: "Samsung" },
    { id: "Realme", label: "Realme" },
    { id: "Lenevo", label: "Lenevo" },
    { id: "Asus", label: "Asus" },
    { id: "Vivo", label: "Vivo" },
    { id: "Oppo", label: "Oppo" },
    
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
