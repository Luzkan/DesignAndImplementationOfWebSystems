window.addEventListener('load', main);

const SEPARTOR = ' ';

// Disclaimer:
//  This task required to make this function
//  with restriction to not use loops & conditions.
//  Version w/ those can be found in /task_2/.

function calc_functional_v1(...args) {
    // Well, here we do actually declare some variables.
    // ... and we iterate 5 times on the array.
    const odd_increased = args.filter(x => x % 2).map(x => x + 1);
    const even_decreased = args.filter(x => x % 2 == 0).map(x => x - 1);
    const adder = (accumulator, current_value) => accumulator + current_value;
    return [...odd_increased, ...even_decreased].reduce(adder)
}

function calc_functional_v2(...args) {
    // Better although one can say that in filter function we do have condition (x % 2)
    // ... and we still iterate more than once on the array.
    return args.filter(x => x % 2).reduce(function(a, b) {
        return a + b + 1;
    }) + args.filter(x => !(x % 2)).reduce(function(a, b) {
        return a + b - 1;
    })
}

function calc_functional_v3(...args){
    // Good Enough...  reminder: (-1)**(2n+1) == -1    and   (-1)**(2n) == 1
    return args.reduce((acc, curr) => acc + curr - (-1)**(curr & 1), 0);
}


function parse_integers(integer_string) {
    // Serving whitespaces as array, becuase .map(Number) would give [0]
    if (!integer_string.trim()) { return [] };

    const numbers = integer_string
        .replace(/\s+/g, ' ')   // Multiple spaces/tabs -> one space
        .trim()                 // Trailing spaces removed
        .split(SEPARTOR)        // Split on space
        .map(Number);           // Convert to numbers
    return numbers;
}

// Simple function to test for valid input with error diplay for user.
function input_is_valid(input_string) {
    if (/^[0-9 _]*$/.test(input_string)) { return true } else {
        result.textContent = `Err: Only space delimited numbers.`;
        return false
    }
}

// Calculation "Manager" with Guard Check for valid input.
function manage_calc(input_string) {
    if (!input_is_valid(input_string)) { return }

    const result = document.getElementById('result');
    const numbers = parse_integers(input_string);
    result.textContent = `${calc_functional_v3(...numbers)}`;
}


// Main with two functions catching button press and "enter" key
function main() {
    const calculate = document.getElementById('calculate');
    const args_input = document.getElementById('arguments_input');
    
    args_input.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            manage_calc(args_input.value)
        }
     });

    calculate.addEventListener('click', () => {
        manage_calc(args_input.value)
    });
}
