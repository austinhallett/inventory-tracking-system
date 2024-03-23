import { index, pgTable, varchar, serial, integer } from "drizzle-orm/pg-core";

export const LocationSchema = {
  id: serial("id").primaryKey(),
  name: varchar("pk_location_name", { length: 50 }).notNull(),
  building: varchar("location_building", { length: 20 }),
  city: varchar("location_city", { length: 50 }),
  country: varchar("location_country", { length: 50 }),
};

export const location = pgTable("location", LocationSchema, (location) => ({
  nameIdx: index("location_name_idx").on(location.name),
}));

export const ProductCategorySchema = {
  id: serial("id").primaryKey(),
  name: varchar("product_category", { length: 30 }).notNull(),
  location: integer("fk_location_id")
    .references(() => location.id, { onDelete: "cascade" })
    .notNull(),
};

export const productCategory = pgTable(
  "product_category",
  ProductCategorySchema,
  (productCategory) => ({
    nameIdx: index("product_category_name_idx").on(productCategory.name),
    productCategoryLocationFk: index("product_category_location_fk").on(
      productCategory.location,
    ),
  }),
);

export const ProductSchema = {
  id: serial("id").primaryKey(),
  name: varchar("product_name", { length: 50 }).notNull(),
  description: varchar("product_description", { length: 500 }),
  vendor: varchar("mfg_vendor", { length: 50 }),
  refreshUrl: varchar("refresh_url", { length: 500 }),
  currentCost: integer("current_cost"),
  currentQty: integer("current_qty").notNull(),
  refreshQty: integer("refresh_qty"),
  minThresholdQty: integer("min_threshold_qty"),
  cabinet: integer("cabinet"),
  obsolete: integer("obsolete"),
  location: integer("fk_location_id")
    .references(() => location.id, { onDelete: "cascade" })
    .notNull(),
  productCategory: integer("fk_product_category_id")
    .references(() => productCategory.id, { onDelete: "cascade" })
    .notNull(),
};

export const product = pgTable("product", ProductSchema, (product) => ({
  productNameIdx: index("product_name_idx").on(product.name),
  productLocationFk: index("product_location_fk").on(product.location),
  productCategoryFk: index("product_category_fk").on(product.productCategory),
}));

export const TransactionSchema = {
  id: serial("id").primaryKey(),
  transactionTime: varchar("transaction_time", { length: 50 }).notNull(),
  userId: varchar("user_id", { length: 50 }).notNull(),
  transactionQty: integer("transaction_qty").notNull(),
  usedScanner: integer("used_scanner"),
  recipient: varchar("recipient", { length: 50 }),
  orderNum: varchar("order_num", { length: 50 }),
  product: integer("fk_product_id")
    .references(() => product.id, { onDelete: "cascade" })
    .notNull(),
};

export const transaction = pgTable(
  "transaction",
  TransactionSchema,
  (transaction) => ({
    transactionProductFk: index("transaction_product_fk").on(
      transaction.product,
    ),
  }),
);

export default {
  location,
  productCategory,
  product,
  transaction,
};
