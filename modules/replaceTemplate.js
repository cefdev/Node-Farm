// Function to replace placeholders in template with product data
const replaceTemplate = (template, product) => {
    let output = template.replaceAll("{%PRODUCTNAME%}", product.productName);
    output = output.replaceAll("{%FROM%}", product.from);
    output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
    output = output.replaceAll("{%QUANTITY%}", product.quantity);
    output = output.replaceAll("{%PRICE%}", product.price);
    output = output.replaceAll("{%IMAGE%}", product.image);
    output = output.replaceAll("{%DESCRIPTION%}", product.description);
    output = output.replaceAll("{%ID%}", product.id);
    // If product is not organic, add 'not-organic' class
    output = !product.organic ? output.replaceAll("{%NOT_ORGANIC%}", 'not-organic') : output;
    return output;
}

module.exports = replaceTemplate;