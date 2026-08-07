// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function transposeMatrix(matrix) {
    let rows = matrix.length;
    let columns = matrix[0].length;
    let transposed = [];
    for (let j = 0; j < columns; j++) {
        let row = [];
        for (let i = 0; i < rows; i++) {
            row.push(matrix[i][j]);
        }
        transposed.push(row);
    }
    return transposed;
}
function addMatrices(matrixA, matrixB) {
    let rows = matrixA.length;
    let columns = matrixA[0].length;
    let result = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(row);
    }
    return result;
}
function multiplyMatrices(matrixA, matrixB) {
    let rowsA = matrixA.length;
    let columnsA = matrixA[0].length;
    let columnsB = matrixB[0].length;
    let result = [];
    for (let i = 0; i < rowsA; i++) {
        let row = [];
        for (let j = 0; j < columnsB; j++) {
            let sum = 0;
            for (let k = 0; k < columnsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }
    return result;
}
function readMatrix(rows, columns, name) {
    let matrix = [];
    console.log(`\nEnter values for Matrix ${name}:`);
    for (let i = 0; i < rows; i++) {
        let row;
        while (true) {
            row = readlineSync.question(`Enter row ${i + 1}: `)
                .trim()
                .split(/\s+/)
                .map(Number);
            if (row.length === columns && row.every(Number.isFinite)) {
                break;
            }
            console.log(`Error: Please enter exactly ${columns} numbers.`);
        }
        matrix.push(row);
    }
    return matrix;
}
function displayMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let row = "";
        for (let j = 0; j < matrix[i].length; j++) {
            row += String(matrix[i][j]).padStart(6);
        }
        console.log(row);
    }
}
function main() {
    console.log("========================================");
    console.log("PART A — MATRIX TRANSPOSE");
    console.log("========================================");
    let rows = readlineSync.questionInt("Enter number of rows: ");
    let columns = readlineSync.questionInt("Enter number of columns: ");
    if (rows <= 0 || columns <= 0) {
        console.log("Error: Rows and columns must be positive.");
        return;
    }
    let matrix = readMatrix(rows, columns, "A");
    console.log("\nOriginal Matrix:");
    displayMatrix(matrix);
    let transposed = transposeMatrix(matrix);
    console.log("\nTransposed Matrix:");
    displayMatrix(transposed);
    console.log("\n========================================");
    console.log("PART B — MATRIX ADDITION");
    console.log("========================================");
    let addRows = readlineSync.questionInt("Enter number of rows: ");
    let addColumns = readlineSync.questionInt("Enter number of columns: ");
    if (addRows <= 0 || addColumns <= 0) {
        console.log("Error: Rows and columns must be positive.");
        return;
    }
    let matrixA = readMatrix(addRows, addColumns, "A");
    let matrixB = readMatrix(addRows, addColumns, "B");
    console.log("\nMatrix A:");
    displayMatrix(matrixA);
    console.log("\nMatrix B:");
    displayMatrix(matrixB);
    let additionResult = addMatrices(matrixA, matrixB);
    console.log("\nA + B:");
    displayMatrix(additionResult);
    console.log("\n========================================");
    console.log("PART C — MATRIX MULTIPLICATION");
    console.log("========================================");
    let rowsA = readlineSync.questionInt("Enter rows for Matrix A: ");
    let columnsA = readlineSync.questionInt("Enter columns for Matrix A: ");
    let rowsB = readlineSync.questionInt("Enter rows for Matrix B: ");
    let columnsB = readlineSync.questionInt("Enter columns for Matrix B: ");
    if (
        rowsA <= 0 ||
        columnsA <= 0 ||
        rowsB <= 0 ||
        columnsB <= 0
    ) {
        console.log("Error: Rows and columns must be positive.");
        return;
    }
    if (columnsA !== rowsB) {
        console.log(
            "Error: The number of columns in Matrix A must equal the number of rows in Matrix B."
        );
        return;
    }
    let multiplyA = readMatrix(rowsA, columnsA, "A");
    let multiplyB = readMatrix(rowsB, columnsB, "B");
    console.log("\nMatrix A:");
    displayMatrix(multiplyA);
    console.log("\nMatrix B:");
    displayMatrix(multiplyB);
    let multiplicationResult = multiplyMatrices(
        multiplyA,
        multiplyB
    );
    console.log("\nA x B:");
    displayMatrix(multiplicationResult);
}
main();
