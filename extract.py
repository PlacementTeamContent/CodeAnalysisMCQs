import json
import csv

def json_to_csv(input_file, output_file):
    # Read the JSON data from the input file
    with open(input_file, 'r') as f:
        json_data = json.load(f)
    
    # Define the header
    header = [
        "question_id", "question_type", "short_text", "question_text", "question_key",
        "content_type", "multimedia_count", "multimedia_format", "multimedia_url", "thumbnail_url",
        "tag_names", "c_options", "w_options", "options_content_type", "code_data",
        "code_language", "explanation", "explanation_content_type", "toughness"
    ]

    rows = []

    for question in json_data:
        # Extract fields from JSON, handling potential missing keys
        question_id = question["input_output"][0].get("question_id", "")
        question_type = question.get("question_type", "")
        short_text = question.get("short_text", "")
        question_text = question.get("question_text", "")
        question_key = question.get("question_key", 0)
        content_type = question.get("content_type", "")

        multimedia_count = len(question.get("multimedia", []))
        if multimedia_count > 0:
            multimedia_format = question["multimedia"][0].get("format", "")
            multimedia_url = question["multimedia"][0].get("url", "")
            thumbnail_url = question["multimedia"][0].get("thumbnail_url", "")
        else:
            multimedia_format = multimedia_url = thumbnail_url = ""

        tag_names = "\n".join(question.get("tag_names", []))

       
        c_options = "".join("OPTION:"+answer for answer in question["input_output"][0].get("output", []))
        w_options = "\n".join("OPTION:" + answer for answer in question["input_output"][0].get("wrong_answers", []))
        options_content_type = question["explanation_for_answer"].get("content_type", "")
        code_data = question["code_metadata"][0].get("code_data", "")
        code_language = question["code_metadata"][0].get("language", "")
        explanation = question["explanation_for_answer"].get("content", "")
        explanation_content_type = question["explanation_for_answer"].get("content_type", "")
        toughness = question.get("toughness", "")

        # Define the row
        row = [
            question_id, question_type, short_text, question_text, question_key, content_type,
            multimedia_count, multimedia_format, multimedia_url, thumbnail_url, tag_names, c_options,
            w_options, options_content_type, code_data, code_language, explanation, explanation_content_type, toughness
        ]

        rows.append(row)

    # Write to CSV
    with open(output_file, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(rows)

    print("CSV file has been created successfully.")

# Usage
input_file = 'input.json'  # Replace with your input JSON file path
output_file = 'output.csv' # Replace with your desired output CSV file path

json_to_csv(input_file, output_file)
