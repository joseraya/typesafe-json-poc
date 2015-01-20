/// <reference path="product.d.ts"/>

interface Invoice {
    /**
     * Who will pay?
     * Not me! éàè
     */
    customer: string;

    /**
     * Invoice content
     * @minItems 1
     * @maxItems 50
     */
    lines: InvoiceLine[];

    blob: any; // Additional stuff
}

interface InvoiceLine {

    product: Product;

    /**
     * @minimum 0
     * @exclusiveMinimum true
     * @maximum 10
     * @exclusiveMaximum false
     * @multipleOf 2
     */
    quantity: number;
}