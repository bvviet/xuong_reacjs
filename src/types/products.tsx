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
  description: string;
};

export type ProductForm = {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
};

export type LoaderData = {
  product: IProduct[];
  cate: Category[];
};
