export type IProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type Category = {
  _id: string;
  name: string;

};

export type ProductForm = {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};
export type GenreFrom = {
  name: string;
};

export type LoaderData = {
  product: IProduct[];
  cate: Category[];
};
export type ProductCart = {
  name: string;
  _id: string;
  price: number;
  image: string;
  category: Category;
}
export type CartItem = {
  product: ProductCart;
  quantity: number;
};
