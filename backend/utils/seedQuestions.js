const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Question = require("../models/Question");

const quizId = "69b658b6002dab6133e915a9";

const questions = [

/* 1 */
{
  quizId,
  question: "Which of the following is an immutable data type in Python?",
  options: [
    { id: "A", text: "List" },
    { id: "B", text: "Dictionary" },
    { id: "C", text: "Set" },
    { id: "D", text: "Tuple" }
  ],
  correctOptionId: "D"
},

/* 2 */
{
  quizId,
  question: "In Python, what does the __init__ method do?",
  options: [
    { id: "A", text: "It initializes a new object (Constructor)." },
    { id: "B", text: "It deletes an object (Destructor)." },
    { id: "C", text: "It imports a module." },
    { id: "D", text: "It converts an object to a string" }
  ],
  correctOptionId: "A"
},

/* 3 */
{
  quizId,
  question: "What does *args represent in a function definition?",
  options: [
    { id: "A", text: "A list of keyword arguments." },
    { id: "B", text: "A single mandatory argument." },
    { id: "C", text: "A variable number of non-keyword arguments." },
    { id: "D", text: "A pointer to a variable." }
  ],
  correctOptionId: "C"
},

/* 4 */
{
  quizId,
  question: "What is the output of python [1:4]?",
  options: [
    { id: "A", text: "pyt" },
    { id: "B", text: "yth" },
    { id: "C", text: "ytho" },
    { id: "D", text: "tho" }
  ],
  correctOptionId: "B"
},

/* 5 */
{
  quizId,
  question: "Which keyword is used to return a value from a function?",
  options: [
    { id: "A", text: "break" },
    { id: "B", text: "stop" },
    { id: "C", text: "return" },
    { id: "D", text: "exit" }
  ],
  correctOptionId: "C"
},

/* 6 */
{
  quizId,
  question: "Which loop executes at least once?",
  options: [
    { id: "A", text: "for" },
    { id: "B", text: "while" },
    { id: "C", text: "do-while" },
    { id: "D", text: "nested for" }
  ],
  correctOptionId: "C"
},

/* 7 */
{
  quizId,
  question: "Which method is the entry point of a Java program?",
  options: [
    { id: "A", text: "start ()" },
    { id: "B", text: "init ()" },
    { id: "C", text: "main ()" },
    { id: "D", text: "run ()" }
  ],
  correctOptionId: "C"
},

/* 8 */
{
  quizId,
  question: "Which collection does not allow duplicate elements?",
  options: [
    { id: "A", text: "List" },
    { id: "B", text: "Array List" },
    { id: "C", text: "Set" },
    { id: "D", text: "Queue" }
  ],
  correctOptionId: "C"
},

/* 9 */
{
  quizId,
  question: "What is the result of typeof(\"sigmoid\")?",
  options: [
    { id: "A", text: "text" },
    { id: "B", text: "string" },
    { id: "C", text: "object" },
    { id: "D", text: "char" }
  ],
  correctOptionId: "B"
},

/* 10 */
{
  quizId,
  question: "What does Promise.all() do?",
  options: [
    { id: "A", text: "Returns the first resolved promise only" },
    { id: "B", text: "Waits for all promises and rejects if any one rejects" },
    { id: "C", text: "Ignores rejected promises" },
    { id: "D", text: "Converts promises to callbacks" }
  ],
  correctOptionId: "B"
},

/* 11 */
{
  quizId,
  question: "Which data structure follows FIFO?",
  options: [
    { id: "A", text: "Stack" },
    { id: "B", text: "Queue" },
    { id: "C", text: "Tree" },
    { id: "D", text: "Graph" }
  ],
  correctOptionId: "B"
},

/* 12 */
{
  quizId,
  question: "Which data structure is typically used for Breadth First Search?",
  options: [
    { id: "A", text: "Stack" },
    { id: "B", text: "Queue" },
    { id: "C", text: "Heap" },
    { id: "D", text: "Array" }
  ],
  correctOptionId: "B"
},

/* 13 */
{
  quizId,
  question: "Which collection allows unique elements only?",
  options: [
    { id: "A", text: "ArrayList" },
    { id: "B", text: "LinkedList" },
    { id: "C", text: "Vector" },
    { id: "D", text: "HashSet" }
  ],
  correctOptionId: "D"
},

/* 14 */
{
  quizId,
  question: "What is a \"lambda\" function?",
  options: [
    { id: "A", text: "A function that runs in the background." },
    { id: "B", text: "A recursive function." },
    { id: "C", text: "A small, anonymous one-line function." },
    { id: "D", text: "A function used only for mathematical calculations." }
  ],
  correctOptionId: "C"
},

/* 15 */
{
  quizId,
  question: "What is the output? System.out.println(10 + 20 + \"Java\");",
  options: [
    { id: "A", text: "1020Java" },
    { id: "B", text: "30Java" },
    { id: "C", text: "Java30" },
    { id: "D", text: "Error" }
  ],
  correctOptionId: "B"
},

/* 16–30 WITH IMAGES (YOUR URLs) */

{
  quizId,
  question: "what will be the output?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q16.png_gnm3ns.png",
  options: [
    { id: "A", text: "[0, 2, 4]" },
    { id: "B", text: "[4, 4, 4]" },
    { id: "C", text: "[0, 0, 0]" },
    { id: "D", text: "[2, 2, 2" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "what will be the output?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q17.png_pta5dg.png",
  options: [
    { id: "A", text: "129" },
    { id: "B", text: "8" },
    { id: "C", text: "121" },
    { id: "D", text: "137" }
  ],
  correctOptionId: "A"
},

{
  quizId,
  question: "What will be the output?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q18.png_vwtfcd.png",
  options: [
    { id: "A", text: "Checked! False Checked! True" },
    { id: "B", text: "False True" },
    { id: "C", text: "Checked! False True" },
    { id: "D", text: "False Checked! True" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "what will be expected output for java code snippet?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q19.png_x1qlzc.png",
  options: [
    { id: "A", text: "120 200 016" },
    { id: "B", text: "120 200 14" },
    { id: "C", text: "120 200 16" },
    { id: "D", text: "Compile error" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "What is the expected output for given python code snippet?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q20.png_swrs6w.png",
  options: [
    { id: "A", text: "10 10 10" },
    { id: "B", text: "2 10 2" },
    { id: "C", text: "2 10 10" },
    { id: "D", text: "2 2 2" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "What will be the output?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q21.png_ax2zbp.png",
  options: [
    { id: "A", text: "50" },
    { id: "B", text: "10" },
    { id: "C", text: "Compile error" },
    { id: "D", text: "Exception" }
  ],
  correctOptionId: "C"
},

{
  quizId,
  question: "Which option is correct?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q22.png_lvcbme.png",
  options: [
    { id: "A", text: "return" },
    { id: "B", text: "send" },
    { id: "C", text: "yield" },
    { id: "D", text: "produce" }
  ],
  correctOptionId: "C"
},

/* 23 normal */
{
  quizId,
  question: "What is the default value of an int variable in Java?",
  options: [
    { id: "A", text: "null" },
    { id: "B", text: "0" },
    { id: "C", text: "1" },
    { id: "D", text: "undefined" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "What is the expected output for given python code snippet?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q24.png_wrq6sl.png",
  options: [
    { id: "A", text: "0 1 2" },
    { id: "B", text: "0 1 2 3 4 5" },
    { id: "C", text: "0 1 2 Done" },
    { id: "D", text: "Done" }
  ],
  correctOptionId: "C"
},

/* 25 */
{
  quizId,
  question: "What is the size of float and double in Java?",
  options: [
    { id: "A", text: "32 and 32 bits" },
    { id: "B", text: "64 and 64 bits" },
    { id: "C", text: "32 and 64 bits" },
    { id: "D", text: "64 and 32 bits" }
  ],
  correctOptionId: "C"
},

{
  quizId,
  question: "What is the expected output of the following Python code?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121772/codexcloudinary/q26.png_olq4oe.png",
  options: [
    { id: "A", text: "[1,2,3,4]" },
    { id: "B", text: "Error" },
    { id: "C", text: "None" },
    { id: "D", text: "[1,2,3]" }
  ],
  correctOptionId: "A"
},

{
  quizId,
  question: "What is the expected output of the following Java code?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q27.png_mryfql.png",
  options: [
    { id: "A", text: "Null" },
    { id: "B", text: "False" },
    { id: "C", text: "True" },
    { id: "D", text: "Compile Error" }
  ],
  correctOptionId: "B"
},

{
  quizId,
  question: "What is the expected output of the following C code snippet?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q28.png_l6vxuj.png",
  options: [
    { id: "A", text: "0" },
    { id: "B", text: "Error" },
    { id: "C", text: "100" },
    { id: "D", text: "10" }
  ],
  correctOptionId: "D"
},

{
  quizId,
  question: "What is the expected output of the following Python code?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121773/codexcloudinary/q29.png_wddrni.png",
  options: [
    { id: "A", text: "2 b" },
    { id: "B", text: "3 a" },
    { id: "C", text: "1 c" },
    { id: "D", text: "1 a" }
  ],
  correctOptionId: "C"
},

{
  quizId,
  question: "What is the expected output of the following Python code?",
  image: "https://res.cloudinary.com/dyh4xhk0z/image/upload/v1775121774/codexcloudinary/q30.png_znioqb.png",
  options: [
    { id: "A", text: "[1][2][1,2,3]" },
    { id: "B", text: "[1][2][1,3]" },
    { id: "C", text: "[1][][1,3]" },
    { id: "D", text: "[1][2][3]" }
  ],
  correctOptionId: "B"
}

];

const seedQuestions = async () => {
  await connectDB();
  await Question.deleteMany();
  await Question.insertMany(questions);
  console.log("✅ All 30 questions inserted");
  process.exit();
};

seedQuestions();
