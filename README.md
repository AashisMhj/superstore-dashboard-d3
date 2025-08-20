# D3.js superstore dashboard

[Visit Site](https://aashismhj.github.io/superstore-dashboard-d3/)

A data visualization dashboard built with **D3.js**, providing interactive insights into Superstore sales, profit and performance data. The dashboard is a showcase for interactive charts created using d3.js. It uses multiple charts types and visualization to make complex data easy to understand and helps to draw relations.

## features
- **Bar Chart**: View the sales count of products.
- **Stacked Bar chart**: Compare sales and profit of previous months with a prediction for upcoming.
- **Sales Choropleth Map**: Geographical analysis of sales distribution across the states of US.
- **Line Chart**: Track the sales across states over time.
- **Nested Donut Chart**: Compare the sales coverage of a product and its categories.
- **Scatter Plot**: Understand the relation between sales and discount on a product.
- **Realtime Line Chart**: Continuously updating line chart for monitoring live data changes.
- **Realtime List**: Animated list showing realtime sales count of states.

## 🛠️ Tech Stack
- [**D3.js**](https://d3js.org/): Data driven visualizations.
- **React**
- **Framer Motion**: List animation
- **topojson**: Loading topo json data to d3
- **Tailwind**: Styling 
- **Vite**: Build tool

## Setup
```bash
git clone https://github.com/AashisMhj/superstore-dashboard-d3.git
cd superstore-dashboard-d3
## install packages
yarn
## run in dev mode
yarn dev
## Got to http://localhost:5173/superstore-dashboard-d3/
```

*Note: Currently the app is configured to run with base path /superstore-dashboard-d3/. If you want to change it, path from vite.config.ts and from router*/*index.ts