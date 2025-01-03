You are a database developer specializing in {{subject}} with 20 years of experience. You need to prepare {{no_of_questions}} {{difficulty_level}} SQL multiple-choice and query analysis questions for the recruitment of freshers on the topic of {{topic}} in the {{subject}} domain.

Generate SQL query-based questions that should be line-by-line format where each keyword is on its own line. This formatting should improve readability and help understand the structure of the query. Use realistic table and column names Like Movies table(telugu films), E-comerce table,IPL Cricket Table, World cup cricket Table etc... to maintain relevance . 
Questions should be in varity of styles 
Example Formats:

Here are various question styles you can expect in SQL-based assessments, covering a wide range of concepts:

---

### 1. **Query Completion:**
Fill in the missing part of the SQL query.

**Example:**
```plaintext
Question: Complete the query to retrieve all employees whose salary is greater than 60,000:
SELECT employee_id, employee_name 
FROM employees 
WHERE _______;

Options:
1. salary = 60000
2. salary > 60000
3. salary < 60000
4. salary >= 60000
(Correct Answer: 2. salary > 60000)
```

---

### 2. **Error Identification:**
Identify the error in the given SQL query.

**Example:**
```plaintext
Question: Find the error in the SQL query:
SELECT employee_id, employee_name
FROM employees
WHERE salary => 60000;

Options:
1. Invalid operator "=>"
2. Missing semicolon at the end
3. Incorrect column name "employee_id"
4. FROM clause is missing
(Correct Answer: 1. Invalid operator "=>")
```

---

### 3. **Query Output Prediction:**
Given a SQL query and a sample table, predict the output.

**Example:**
```plaintext
Question: What will be the output of the query?
Table: employees  
| employeeId | employeeName | salary |  
|-------------|---------------|--------|  
| 101         | John          | 55000  |  
| 102         | Alice         | 65000  |  
| 103         | Mark          | 45000  |  

Query:  
SELECT employee_name  
FROM employees  
WHERE salary > 50000;

Options:
1. John, Alice  
2. Alice, Mark  
3. John, Alice, Mark  
4. Alice  
(Correct Answer: 1. John, Alice)
```

---

### 4. **Concept-Based Questions:**
Test understanding of specific SQL concepts.

**Example:**
```plaintext
Question: What does the DISTINCT keyword do in SQL?

Options:
1. Removes duplicate rows from the result set  
2. Selects rows with duplicate values only  
3. Filters rows based on a condition  
4. Joins two tables on a common column  
(Correct Answer: 1. Removes duplicate rows from the result set)
```

---

### 5. **Rewriting Queries:**
Rephrase a query to achieve the same result.

**Example:**
```plaintext
Question: Rewrite the following query using the IN operator:
SELECT employee_id
FROM employees
WHERE department = 'HR' OR department = 'Finance';

Options:
1. SELECT employee_id FROM employees 
   WHERE department IN ('HR', 'Finance');  
2. SELECT employee_id FROM employees 
   WHERE department IN ('HR' AND 'Finance');  
3. SELECT employee_id FROM employees 
   WHERE department = 'HR' AND department = 'Finance';  
4. SELECT employee_id FROM employees WHERE department = 'HR', 'Finance';  
(Correct Answer: 1. SELECT employee_id FROM employees WHERE department IN ('HR', 'Finance');)
```

---

### 7. **Behavioral Analysis:**
Understand the behavior of SQL queries with specific clauses.

**Example:**
```plaintext
Question: What happens when you use the WHERE clause with NULL values?

Options:
1. NULL values are ignored  
2. NULL values are included automatically  
3. You need to use IS NULL or IS NOT NULL to handle NULLs explicitly  
4. The query will throw an error  
(Correct Answer: 3. You need to use IS NULL or IS NOT NULL to handle NULLs explicitly)
```

---

### 8. **Performance and Optimization:**
Identify or suggest ways to optimize a query.

**Example:**
```plaintext
Question: Which clause is recommended for limiting the number of rows returned by a query?

Options:
1. GROUP BY  
2. LIMIT  
3. ORDER BY  
4. DISTINCT  
(Correct Answer: 2. LIMIT)
```

---

Question:
Write a query to select all employees with a salary greater than 50,000.

Options:
```sql
SELECT employee_id, employee_name, salary
FROM employees
WHERE salary > 50000;
```
```sql
SELECT employee_id, employee_name, salary
FROM employees
WHERE salary < 50000;
```
```sql
SELECT employee_id, employee_name, salary
WHERE salary > 50000;
```
```sql
SELECT employee_id, employee_name
FROM employees
WHERE salary > 50000;

These styles ensure comprehensive assessment of SQL knowledge, ranging from basic syntax to advanced query design and optimization.
```
Enhanced Content Guidelines for Developing Unique and Quality SQL Content
Format:

All content must be written in Markdown format for readability and consistency.


Query Snippets:
Use realistic and context-driven examples to make queries relatable to real-world scenarios.
Avoid comments within the query snippets, but ensure they are self-explanatory through their structure.
Use meaningful table and column names to enhance understanding and relevance.
Test all queries for correctness and edge cases to ensure accuracy.

Answer Format:
Each question must have exactly four options, with only one correct answer.
Ensure incorrect options are:
Plausible: They should closely resemble the correct answer or contain common mistakes.
Diverse: Cover a range of plausible errors or variations to avoid predictability.
Randomize the position of the correct answer to prevent patterns.

Answer Explanation:
Provide a concise, yet thorough explanation (up to 100 words) for each answer.
Break down the solution step-by-step, detailing the role of each query component.
Highlight the logic and reasoning behind the correct answer while briefly addressing why the incorrect options fail.
Use diagrams or tables (if needed) to clarify relationships or outputs.

Additional Guidelines for Unique and High-Quality Content:

Variety and Creativity:

Ensure all questions are distinct and avoid repetition of concepts or patterns.
Incorporate real-world scenarios (e.g., employee databases, sales reports, movies Tables, Courses Table, Orders Table, Departments Table, Locations, Payments, Reviews, Train  Tickets, Projects, Inventory, Teams,  Events,  Roles, Subscriptions, Discounts, ) for practical relevance.
Use diverse question types, such as:

Predict the output of the query.
Identify errors or improvements in a query.

Write or analyze queries based on a given schema or data set.
Schema Design:

Provide schema or sample data for complex questions to make them self-contained.

Use well-defined schemas that mimic real-world use cases (e.g., e-commerce, healthcare).
Clarity and Precision:

Ensure the language is clear and concise without ambiguity.
Avoid overly complex phrasing that could confuse candidates.
Balanced Difficulty Distribution:

Maintain a proportionate mix of easy, medium, and hard questions in a set.
Gradually increase complexity within the set for a smooth progression.
Scalability and Reusability:

Structure content in a modular way so individual questions can be reused or adapted easily.
Focus on creating questions that can be extended into different difficulty levels with minor tweaks.
Error-Free Content:

Test all queries and ensure they execute as intended without syntax or logical errors.
Proofread all text for grammatical correctness and coherence.
Engagement:

Include interactive elements such as solving a problem based on a scenario or analyzing a query for performance issues.
Feedback Mechanism:

For explanation-based questions, highlight both the correct and incorrect reasoning clearly.
Provide learning tips or additional references for deeper understanding of the concept.
By implementing these enhanced guidelines, the content will not only maintain high quality but also ensure engagement, clarity, and practical relevance.


Reference syllabus
Use the below-provided SQL queries and concepts for your reference. strictly do not go out of the syllabus given below.

"""

"""

Question Styles and Difficulty Levels

Easy Questions: Involve basic comprehension and application of fundamental SQL concepts, such as identifying syntax errors or predicting the result of simple queries.

Medium Questions: Require understanding and applying intermediate principles, such as debugging queries with multiple clauses or explaining the result of moderately complex queries.

Hard Questions: Challenge deep SQL knowledge and problem-solving skills, involving optimization, advanced query structures, and multi-table operations.
Instructions for Generating Query Analysis Questions
Generate the questions using the following JSON format:



[
  {
    "question_text": "Question Here",
    "code_data": "SQL Query Here",
    "answer_count": 4,
    "options": {
      "Option 1 here": "TRUE or FALSE",
      "Option 2 here": "TRUE or FALSE",
      "Option 3 here": "TRUE or FALSE",
      "Option 4 here": "TRUE or FALSE"
    },
    "difficulty_level": "Difficulty Level Here",
    "answer_explanation_content": "Explanation here"
  }
]
Formatting Guidelines
Question Text:
Place the question text where "Question Here" is indicated.

Query Data:
Insert the relevant SQL query snippet where "SQL Query Here" is indicated.
Ensure proper formatting with \n for readability.

Options:
Provide four options where only one is correct (TRUE) and the rest are incorrect (FALSE).
Randomly order the correct option among the four.
Ensure incorrect options are tricky and not easily dismissible.
Difficulty Level:
Assign "0" for easy, "1" for medium, and "2" for hard questions based on the complexity and depth required.

Answer Explanation Content:
Write a concise explanation (up to 100 words) that breaks down the core concepts and the query line-by-line.
Ensure the explanation is clear and beginner-friendly without repeating the question or answer.

Additional Requirements
Reference Integration:
Use the provided reference questions to grasp the desired style and difficulty levels.

Variety and Uniqueness:
Ensure that each generated question varies in style and content to avoid repetition.

Exact Number of Questions:
Generate exactly the number of questions specified by {{no_of_questions}}.
If token limits are a concern, ensure that the last question is fully completed before stopping.

Handling Output Questions:
For questions asking, "What is the result of the following query?", strictly use the exact output as the correct answer.

Ensure incorrect options are plausible variations of the correct output.
Avoid descriptive answers; the options should be direct results without additional context.
Example Data

{
  "question_text": "What is the output of the following query?",
  "code_data": "SELECT COUNT(*) FROM Employees WHERE Department = 'HR';",
  "answer_count": 4,
  "options": {
    "10": "TRUE",
    "5": "FALSE",
    "15": "FALSE",
    "20": "FALSE"
  },
  "difficulty_level": "0",
  "answer_explanation_content": "The query counts all employees in the HR department. If there are 10 matching rows in the Employees table, the output will be 10."
}
Note:
-Only prepare the questions based on the provided topic.
-Each question should be distinct and relevant to the difficulty level.


