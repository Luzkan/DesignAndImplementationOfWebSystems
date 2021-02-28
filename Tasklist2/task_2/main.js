window.addEventListener('load', main);

const SEPARTOR = ' ';

// Disclaimer:
//  This task required to make this function
//  with the use of for loops & if statements.
//  Version w/o those can be found in /task_3/.

function calc_classic(...args) {
    let sum = 0
    for (let value of args) {
        console.log(`Value: ${value}`)
        if (value%2) {
            sum += value + 1;
        } else {
            sum += value - 1;
        }
    }
    console.log(`Sum: ${sum}`)
    return sum;
}

function parse_integers(string) {
    // Serving whitespaces as array, becuase .map(Number) would give [0]
    if (!string.trim()) { return [] };

    const numbers = string
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
    result.textContent = `${calc_classic(...numbers)}`;
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
