interface Product {
    /**
     * Uniquely defines the product
     * @pattern [A-Z][a-z][0-9]_
     */
    name: string;

    /** Classification */
    category: Category;

}

interface Category {
    /** Uniquely identifies the category */
    name: string;

    /** Classification level from 1 to 5 (highest)
     * @type integer */
    level: number;
}