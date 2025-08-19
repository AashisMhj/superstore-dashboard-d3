export type StoreDataType = {
  "Row Id": string;
  "Order Id": string;
  "Order Date": string;
  "Ship Date": string;
  "Ship Mode": string;
  "Customer ID": string;
  "Customer Name": string;
  Segment: string;
  Country: string;
  City: string;
  State: string;
  "Postal Code": string;
  Region: string;
  "Product ID": string;
  Category: string;
  "Sub-Category": string;
  "Product Name": string;
  Sales: string;
  Quantity: string;
  Discount: string;
  Profit: string;
};

export type AggregateStatesSalesType = {
  id: number;
  label: string;
  dataSum: number;
  data: Array<number>;
  color: string;
  previousIndex: number;
  highlight: boolean;
  flag_url: string;
};
