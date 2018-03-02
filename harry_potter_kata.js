function checkout(books) {
    // Input: array, [1, 1, 1, 1, 2], buy one book of s1-4, two of s5
    // Output: Int, best price after discount

    books = books.filter((same_book_number) => same_book_number !== 0) // get rid of empty series 

    var per_book_price = 100;
    var bundle_discount_info = {
        1: 1,
        2: 0.95,
        3: 0.9,
        4: 0.8,
        5: 0.75
    };

    if (!books) return 0; //no books, no price.
    if (books.length == 1) return per_book_price; //one book, per price;


    function calculate_bundles(books) {
        //Input: array [1, 1, 2, 2, 3]
        //Output: Object  {"discount": [5, 4, 3], "undiscounted": 2} e.g. 
        var bundles = {
                "discount": [],
                "undiscounted": 0
            },
            undiscounted_books_num = 0;
        //get bundles so that can discount each bundle
        while (books.length !== 0) {
            bundles.discount.push(books.length); // push books number in a bundle to bundles
            books = books.map((same_series) => same_series -= 1)
                .filter((same_series) => same_series !== 0);
            if (books.length == 1) {
                bundles.undiscounted = books[0];
                break;
            }
        }

        var discount_books_num = bundles.discount.reduce((sum, b_num) => sum + b_num, 0);

        if (discount_books_num > 4 && discount_books_num % 4 == 0) {
            bundles.discount = Array.from({
                length: discount_books_num / 4
            }, (book_number) => book_number = 4);
        }

        return bundles;
    }


    function price(books) {

        var bundles = calculate_bundles(books.slice(0));

        var discounted_price = bundles.discount.reduce((sum, books_num_of_bundle) =>
            sum + (per_book_price * books_num_of_bundle) * bundle_discount_info[books_num_of_bundle], 0);
        var undiscounted_price = bundles.undiscounted * per_book_price;

        return discounted_price + undiscounted_price;
    }

    return price(books)

}

console.log(checkout([1, 1, 0, 0, 0]) == 190)
console.log(checkout([1, 1, 1, 0, 0]) == 270)
console.log(checkout([1, 1, 3, 1, 0]) == 520)
console.log(checkout([1, 1, 1, 1, 1]) == 375)
console.log(checkout([1, 1, 2, 0, 0]) == 370)
console.log(checkout([1, 2, 2, 0, 0]) == 460)
console.log(checkout([3, 3, 5, 5, 4]) == 1600)