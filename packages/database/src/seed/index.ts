import { db } from '../db'
import { products } from './products.json' with {type: 'json'}
import { locations } from './locations.json' with {type: 'json'}
import { categories } from './categories.json' with {type: 'json'}
import { transactions } from './transactions.json' with {type: 'json'}
import { product, location, productCategory, transaction } from '../schema'

/** 
 * Function to seed database with test data
 * note order of operations is important to avoid 
 * foreign key constraint errors
 */
export async function seedDatabase(): Promise<void> {
    await db.insert(location).values(locations)

    await db.insert(productCategory).values(categories)
    
    await db.insert(product).values(products)

    await db.insert(transaction).values(transactions)
}

await seedDatabase()